import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarparkInfo } from '@src/models/carpark-info.entity';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CarparkInfoTransformDataDto, EFilterOptionsCarparkInfo, GetListOfCarparkInfoDto } from './carpark-info.dto';
import { chunk } from 'lodash';
import { DEFAULT_LIMIT } from '@src/constants/constant';

@Injectable()
export class CarparkInfoRepository {
  private logger = new Logger(CarparkInfoRepository.name);
  private alias: string = 'carpark-info';
  constructor(
    private dataSource: DataSource,
    @InjectRepository(CarparkInfo)
    private readonly carparkInfoRepository: Repository<CarparkInfo>,
  ) {}

  getRepository() {
    return this.carparkInfoRepository;
  }

  async syncDatabase(data: CarparkInfoTransformDataDto[]) {
    this.logger.log('=== Start Synchronize Database ===');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const carparkInfoData: CarparkInfo[] = [];
    for (const element of data) {
      const carparkInfo = queryRunner.manager.create(CarparkInfo, element) as CarparkInfo;
      carparkInfoData.push(carparkInfo);
    }

    await queryRunner.startTransaction();
    try {
      for (const chunkItem of chunk(carparkInfoData, 50)) {
        await queryRunner.manager.upsert(CarparkInfo, chunkItem, {
          conflictPaths: ['carParkNo'],
          upsertType: 'on-conflict-do-update',
        });
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error('Error when sync db: ', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async initDatabase(data: CarparkInfoTransformDataDto[]) {
    this.logger.log('=== Start Initiate Database ===');
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const carparkInfoData: CarparkInfo[] = [];
    for (const element of data) {
      const carparkInfo = queryRunner.manager.create(CarparkInfo, element) as CarparkInfo;
      carparkInfoData.push(carparkInfo);
    }

    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(carparkInfoData, { chunk: 50 });
      await queryRunner.commitTransaction();
    } catch (error) {
      this.logger.error('Error when init db: ', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  getListOfCarpark(query: GetListOfCarparkInfoDto) {
    const { page = 1, limit = DEFAULT_LIMIT } = query;
    const queryBuilder = this.carparkInfoRepository.createQueryBuilder(this.alias);

    queryBuilder.where(`${this.alias}.carParkNo IS NOT NULL`);

    if (query.freeParking === EFilterOptionsCarparkInfo.YES) {
      queryBuilder.andWhere(`${this.alias}.freeParking != 'NO'`);
    }
    if (query.freeParking === EFilterOptionsCarparkInfo.NO) {
      queryBuilder.andWhere(`${this.alias}.freeParking = 'NO'`);
    }
    if (query.nightParking) {
      queryBuilder.andWhere(`${this.alias}.nightParking = :nightParkingQuery`, {
        nightParkingQuery: query.nightParking,
      });
    }
    if (query.vehicleHeightRequirement) {
      queryBuilder.andWhere(
        new Brackets(qb => {
          qb.where(`${this.alias}.gantryHeight = 0`).orWhere(`${this.alias}.gantryHeight >= :heightRequirement`, {
            heightRequirement: query.vehicleHeightRequirement,
          });
        }),
      );
    }

    if (page) {
      queryBuilder.skip((page - 1) * (limit || DEFAULT_LIMIT));
    }
    if (limit) {
      queryBuilder.take(limit);
    }

    return queryBuilder.getManyAndCount();
  }
}
