import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Health Check')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('ping')
  @ApiOperation({
    operationId: 'ping',
    description: 'Ping the service',
  })
  getPing(): string {
    return this.appService.getPing();
  }
}
