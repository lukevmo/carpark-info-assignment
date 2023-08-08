import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENVIRONMENTS } from '@src/constants/constant';
import { EEnvType } from '@src/constants/env.type';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        [EEnvType.NODE_ENV]: Joi.string().valid(...ENVIRONMENTS),
        [EEnvType.PORT]: Joi.number().default(3000),
        [EEnvType.BCRYPT_SALT_ROUNDS]: Joi.number().default(14),
        [EEnvType.JWT_SECRET_KEY]: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigurationModule {}
