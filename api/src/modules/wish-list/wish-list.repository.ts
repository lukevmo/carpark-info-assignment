import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
