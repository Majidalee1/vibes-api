import { Module } from '@nestjs/common';
import { SimpleController } from './simple.controller';
import { SimpleService } from './simple.service';

@Module({
  // imports: [],
  controllers: [SimpleController],
  providers: [SimpleService],
})
export class SimpleModule {}
