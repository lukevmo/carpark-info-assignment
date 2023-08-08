import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import * as csv from 'csvtojson';
import { join } from 'path';
import { CarparkInfoService } from '../carpark-info/carpark-info.service';
import { getExecuteFile } from './cron-task.util';
import { ICarparkInfoRawCsv2JsonData } from '../carpark-info/carpark-info.interface';

@Injectable()
export class CronTaskService {
  private logger = new Logger(CronTaskService.name);
  constructor(private readonly carparkInfoService: CarparkInfoService) {}

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async syncDatabaseFromDailyFile() {
    const executeFile = getExecuteFile();
    const filePath = join(__dirname, '../../../', 'file-import/', executeFile);
    const jsonData = (await csv().fromFile(filePath)) as ICarparkInfoRawCsv2JsonData[];

    return this.carparkInfoService.syncDatabase(jsonData);
  }
}
