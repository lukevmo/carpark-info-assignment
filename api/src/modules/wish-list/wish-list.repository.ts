import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DEFAULT_LIMIT } from '@src/constants/constant';
import { WishList } from '@src/models/wish-list.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class WishListRepository {
  private alias: string = 'wish-list';
  constructor(
    private dataSource: DataSource,
    @InjectRepository(WishList)
    private readonly wishListRepository: Repository<WishList>,
  ) {}

  getRepository() {
    return this.wishListRepository;
  }

  getListFavoriteCarpark(userId: number, page: number, limit: number) {
    const queryBuilder = this.wishListRepository.createQueryBuilder(this.alias);
    queryBuilder
      .where(`${this.alias}.userId = :userId`, { userId })
      .select([
        `${this.alias}.id`,
        `${this.alias}.userId`,
        `${this.alias}.carParkNoId`,
        `${this.alias}.status`,
        `${this.alias}.createdAt`,
      ])
      .orderBy(`${this.alias}.id`, 'DESC');

    if (limit) {
      queryBuilder.take(limit);
    }
    if (page) {
      queryBuilder.skip((page - 1) * (limit || DEFAULT_LIMIT));
    }

    return queryBuilder.getManyAndCount();
  }
}
