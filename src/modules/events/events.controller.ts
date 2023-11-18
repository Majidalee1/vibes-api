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
import { JwtAuthGuard } from 'src/common/guard/jwtAuth.guard';

@ApiTags('Event')
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @Post()
  async createEvent(
    @Body() body: CreateEventDto,
    @GetUser() user: IUserSession,
  ) {
    return await this.eventsService.createEvent(body, user);
  }

  @Delete(':id')
  async deleteEvent(
    @GetUser() user: IUserSession,
    @Param('id') eventId: string,
  ) {
    return await this.eventsService.deleteEvent(user, eventId);
  }

  @Patch(':id')
  async updateEvent(
    @GetUser() user: IUserSession,
    @Param('id') eventId: string,
    @Body() body: UpdateEventDto,
  ) {
    return await this.eventsService.updateEvent(body, user, eventId);
  }
}
