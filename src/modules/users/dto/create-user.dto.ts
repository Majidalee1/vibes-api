import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  isEmail,
  isNotEmpty,
} from 'class-validator';

@Expose()
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsEmail()
  @ApiProperty()
  email: string;

  @Expose()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  bio: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  homeTown: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  imageUrl: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  chatIds: string[];

  @ApiProperty()
  @Expose()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  profileType: 'brand' | 'personal';

  @ApiProperty()
  @Expose()
  @IsOptional()
  items: {
    [key: string]: any;
  }[];

  @ApiProperty()
  @Expose()
  @IsOptional()
  member_id: string;
}
