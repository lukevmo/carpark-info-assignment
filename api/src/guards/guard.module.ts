import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AccessAuthGuard } from './access-auth.guard';
import { TokenModule } from '@src/modules/token/token.module';

@Module({
  imports: [TokenModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessAuthGuard,
    },
  ],
})
export class GuardModule {}
