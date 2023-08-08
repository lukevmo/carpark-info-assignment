import { Module } from '@nestjs/common';
import { CarparkInfoService } from './carpark-info.service';
import { CarparkInfoController } from './carpark-info.controller';
import { CarparkInfoRepository } from './carpark-info.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarparkInfo } from '@src/models/carpark-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarparkInfo])],
  providers: [CarparkInfoService, CarparkInfoRepository],
  controllers: [CarparkInfoController],
  exports: [CarparkInfoService],
})
export class CarparkInfoModule {}
