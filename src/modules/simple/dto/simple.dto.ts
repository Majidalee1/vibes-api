import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateSimpleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  phone: string;
}
