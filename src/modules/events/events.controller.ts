import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './events.dto';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { IUserSession } from 'src/shared/interfaces';

@ApiTags('Event')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @Post()
  async createEvent(@Body() body: CreateEventDto) {
    return await this.eventsService.createEvent(body);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') eventId: string) {
    return await this.eventsService.deleteEvent(eventId);
  }

  @Patch(':id')
  async updateEvent(
    // @GetUser() user: IUserSession,
    @Param('id') eventId: string,
    @Body() body: UpdateEventDto,
  ) {
    return await this.eventsService.updateEvent(body, eventId);
  }
}
