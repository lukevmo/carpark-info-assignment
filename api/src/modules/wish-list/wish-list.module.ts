import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishList } from '@src/models/wish-list.entity';
import { WishListService } from './wish-list.service';
import { WishListRepository } from './wish-list.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WishList])],
  providers: [WishListService, WishListRepository],
  exports: [WishListService],
})
export class WishListModule {}
