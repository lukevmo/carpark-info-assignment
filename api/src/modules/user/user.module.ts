import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/models/user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { TokenModule } from '../token/token.module';
import { WishListModule } from '../wish-list/wish-list.module';
import { CarparkInfoModule } from '../carpark-info/carpark-info.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule, CarparkInfoModule, WishListModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
