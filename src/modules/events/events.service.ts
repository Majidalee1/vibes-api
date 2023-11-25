import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/entities/events.entity';
import { Repository } from 'typeorm';
import { CreateEventDto, UpdateEventDto } from './events.dto';
import { IUserSession } from 'src/shared/interfaces';
import * as Exception from '@nestjs/common/exceptions';
import { User } from 'src/entities/users.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getAllEvents() {
    return this.eventRepo.find({
      relations: {
        postedBy: true,
      },
    });
  }

  async createEvent(payload: CreateEventDto) {
    const event = this.eventRepo.create({
      ...payload,
    });

    event.postedBy = await this.userRepo.findOneByOrFail([
      { id: payload.member_id },
      { member_id: payload.member_id },
    ]);

    return this.eventRepo.save(event);
  }

  async deleteEvent(eventId: string) {
    // const isUserAuthorized = this.eventRepo.findOne({
    //   where: {
    //     id: eventId,
    //     postedBy: {
    //       id: userSession.userId,
    //     },
    //   },
    // });

    // if (!isUserAuthorized) {
    //   throw new Exception.BadRequestException('user is not Authorized');
    // }

    return this.eventRepo.delete({
      id: eventId,
    });
  }

  async updateEvent(
    payload: UpdateEventDto,
    // userSession: IUserSession,
    eventId: string,
  ) {
    // const isUserAuthorized = this.eventRepo.findOne({
    //   where: {
    //     id: eventId,
    //     postedBy: {
    //       id: userSession.userId,
    //     },
    //   },
    // });

    // if (!isUserAuthorized) {
    //   throw new Exception.BadRequestException('user is not Authorized');
    // }

    await this.eventRepo.update({ id: eventId }, payload);

    return this.eventRepo.findOne({
      where: {
        id: eventId,
      },
    });
  }
}
