import { Module } from '@nestjs/common';
import { CronTaskService } from './cron-task.service';
import { CarparkInfoModule } from '../carpark-info/carpark-info.module';

@Module({
  imports: [CarparkInfoModule],
  providers: [CronTaskService],
})
export class CronTaskModule {}
