import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';

@Injectable()
export class UsersService {
  // inject the user repository

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    createUserDto.password = Math.random().toString(36).substring(14);
    console.log({ createUserDto });
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    const response = this.userRepository.find();
    return response;
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: [{ id }, { member_id: id }],
      relations: {
        posts: true,
        notifications: true,
        following: true,
        followers: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail([
      { id },
      { member_id: id },
    ]);
    return this.userRepository.merge(user, updateUserDto).save();
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
