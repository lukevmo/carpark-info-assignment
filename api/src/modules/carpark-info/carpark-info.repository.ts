import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarparkInfo } from '@src/models/carpark-info.entity';
import { DataSource, Repository } from 'typeorm';
import { CarparkInfoTransformDataDto } from './carpark-info.dto';
import { chunk } from 'lodash';

@Injectable()
export class CarparkInfoRepository {
  private logger = new Logger(CarparkInfoRepository.name);
  private alias: string = 'carpark-info';
  constructor(
    private dataSource: DataSource,
    @InjectRepository(CarparkInfo)
    private readonly carparkInfoRepository: Repository<CarparkInfo>,
  ) {}

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
}
