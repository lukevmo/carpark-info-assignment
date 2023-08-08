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

@Module({
  imports: [ConfigurationModule, GuardModule, PipeModule, InterceptorModule, DatabaseModule],
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
