import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty()
  @IsOptional()
  businesses: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  organizers: string[];

  @ApiProperty()
  @IsNotEmpty()
  member_id: string;
}

export class UpdateEventDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  date: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  price: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  businesses: string[];

  @ApiProperty()
  @IsOptional()
  @IsArray()
  organizers: string[];
}

export interface Business {
  name: string;
  description?: string;
  image?: string;
}

export interface Organizer {
  name: string;
  description?: string;
  image?: string;
}
