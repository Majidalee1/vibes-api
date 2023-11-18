import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Exception from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UserValidationService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async throwErrorIfUserDoesNotExits(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Exception.ConflictException('User Does Not Exits.');
    }

    return user;
  }

  async throwErrorIfUserDoesNotExitsByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Exception.ConflictException('User Does Not Exits.');
    }

    return user;
  }

  async throwErrorIfEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email: email },
    });

    if (!!user) {
      throw new Exception.ConflictException('Email already Exits.');
    }

    return user;
  }

  async throwErrorIfUserPhoneExits(phone: string) {
    const user = await this.userRepo.findOne({ where: { phone: phone } });

    if (!!user) {
      throw new Exception.ConflictException('Phone already Exits.');
    }
  }
  async throwErrorIfUserUserName(userName: string) {
    const user = await this.userRepo.findOne({ where: { username: userName } });

    if (!!user) {
      throw new Exception.ConflictException('userName already Exits.');
    }
  }
}
