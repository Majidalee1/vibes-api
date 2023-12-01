import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Expose } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

@Expose()
export class addFollowerDto {
  @Expose()
  @ApiProperty()
  followerId: string;
}
