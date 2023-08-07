import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AccessAuthGuard } from './access-auth.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessAuthGuard,
    },
  ],
})
export class GuardModule {}
