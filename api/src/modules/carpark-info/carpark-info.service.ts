import { Injectable } from '@nestjs/common';
import { CarparkInfoRepository } from './carpark-info.repository';
import { ICarparkInfoRawCsv2JsonData } from './carpark-info.interface';
import { CarparkInfoTransformDataDto } from './carpark-info.dto';

import * as csv from 'csvtojson';
import { join } from 'path';
import { getExecuteFile } from '../cron-task/cron-task.util';

@Injectable()
export class CarparkInfoService {
  constructor(private readonly carparkInfoRepository: CarparkInfoRepository) {}

  async initDatabase() {
    const executeFile = getExecuteFile();
    const filePath = join(__dirname, '../../../', 'file-import/', executeFile);
    const jsonData = (await csv().fromFile(filePath)) as ICarparkInfoRawCsv2JsonData[];

    const transformData: CarparkInfoTransformDataDto[] = jsonData.map(item => {
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
    return this.carparkInfoRepository.initDatabase(transformData);
  }

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
