import { Injectable } from '@nestjs/common';
import { CarparkInfoRepository } from './carpark-info.repository';
import { ICarparkInfoRawCsv2JsonData } from './carpark-info.interface';
import { CarparkInfoTransformDataDto } from './carpark-info.dto';

@Injectable()
export class CarparkInfoService {
  constructor(private readonly carparkInfoRepository: CarparkInfoRepository) {}

  async syncDatabase(rawData: ICarparkInfoRawCsv2JsonData[]) {
    const transformData: CarparkInfoTransformDataDto[] = rawData.map(item => {
      return {
        carParkNo: item.car_park_no,
        address: item.address,
        xCoord: +item.x_coord || 0.0,
        yCoord: +item.y_coord || 0.0,
        carParkType: item.car_park_type,
        typeOfParkingSystem: item.type_of_parking_system,
        shortTermParking: item.short_term_parking,
        freeParking: item.free_parking,
        nightParking: item.night_parking,
        carParkDecks: +item.car_park_decks || 0,
        gantryHeight: +item.gantry_height || 0,
        carParkBasement: item.car_park_basement,
      };
    });
    return this.carparkInfoRepository.syncDatabase(transformData);
  }
}
