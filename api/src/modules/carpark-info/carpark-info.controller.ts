import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarparkInfoService } from './carpark-info.service';
import { GetListOfCarparkInfoDto } from './carpark-info.dto';

@Controller('carpark-info')
@ApiTags('Carpark Info')
export class CarparkInfoController {
  constructor(private readonly carparkInfoService: CarparkInfoService) {}

  @Get()
  @ApiBearerAuth()
  getListOfCarpark(@Request() request, @Query() query: GetListOfCarparkInfoDto) {
    return this.carparkInfoService.getListOfCarpark(query);
  }
}
