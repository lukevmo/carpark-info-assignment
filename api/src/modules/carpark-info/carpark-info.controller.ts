import { ClassSerializerInterceptor, Controller, Get, Query, Request, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarparkInfoService } from './carpark-info.service';
import { GetListOfCarparkInfoDto, ListOfCarparkResponseDto } from './carpark-info.dto';

@Controller('carpark-info')
@ApiTags('Carpark Info')
export class CarparkInfoController {
  constructor(private readonly carparkInfoService: CarparkInfoService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: ListOfCarparkResponseDto })
  @UseInterceptors(ClassSerializerInterceptor)
  getListOfCarpark(@Request() request, @Query() query: GetListOfCarparkInfoDto) {
    return this.carparkInfoService.getListOfCarpark(query);
  }
}
