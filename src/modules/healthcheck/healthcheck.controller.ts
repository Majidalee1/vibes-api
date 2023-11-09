import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './healthcheck.service';

@Controller()
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}

  @Get('ping')
  ping() {
    return this.healthCheckService.ping();
  }
}
