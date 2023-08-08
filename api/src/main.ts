import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EEnvType } from './constants/env.type';
import { AppModule } from './modules/app/app.module';

import { initializeApp, initializeSwagger } from './share/bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await initializeApp(app);
  initializeSwagger(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.get(EEnvType.PORT));
}
bootstrap();
