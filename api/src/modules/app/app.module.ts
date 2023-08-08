import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GuardModule } from '@src/guards/guard.module';
import { InterceptorModule } from '@src/interceptors/interceptor.module';
import { LoggerHttpRequestMiddleware } from '@src/middlewares/http-request-log.middleware';
import { JsonBodyMiddleware } from '@src/middlewares/json-body.middleware';
import { PipeModule } from '@src/pipes/pipe.module';
import { ConfigurationModule } from '../config/configuration.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronTaskModule } from '../cron-task/cron-task.module';
import { CarparkInfoModule } from '../carpark-info/carpark-info.module';
import { UserModule } from '../user/user.module';
import { WishListModule } from '../wish-list/wish-list.module';

@Module({
  imports: [
    ConfigurationModule,
    GuardModule,
    PipeModule,
    InterceptorModule,
    DatabaseModule,
    ScheduleModule.forRoot(),
    CronTaskModule,
    CronTaskModule,
    CarparkInfoModule,
    UserModule,
    WishListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JsonBodyMiddleware).forRoutes('*');

    if (process.env.NODE_ENV === 'development') {
      consumer.apply(LoggerHttpRequestMiddleware).forRoutes('*');
    }
  }
}
