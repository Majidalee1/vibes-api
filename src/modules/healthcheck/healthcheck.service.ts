import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthCheckService {
  constructor(private config: ConfigService) {}

  ping() {
    return {
      port: this.config.get('APP_PORT'),
      apiStatus: `your api are working ready do go`,
    };
  }
}
