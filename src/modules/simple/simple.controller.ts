import {
  Controller,
  Get,
  Param,
  // ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { SimpleService } from './simple.service';
import { CreateSimpleDto } from './dto/simple.dto';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { RATE_LIMITER_LIMIT, RATE_LIMITER_TTL } from 'src/shared/constants';

@ApiTags('simple')
@Controller('simple')
export class SimpleController {
  constructor(private service: SimpleService) {}

  @Throttle({ default: { limit: RATE_LIMITER_LIMIT, ttl: RATE_LIMITER_TTL } })
  @Get()
  async get() {
    return await this.service.get();
  }

  @Get('/:id')
  // async getByID(@Param('id', ParseIntPipe) id: number) <- use this if you to formate the id into number
  async getByID(@Param('id') id: number) {
    return await this.service.getById(id);
  }

  @Post()
  async create(@Body() body: CreateSimpleDto) {
    return await this.service.create(body);
  }
}
