import { Injectable } from '@nestjs/common';
import { LoginUserDto, SignUpUserDto } from './auth.dto';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserValidationService } from 'src/common/validations/user.validation.service';
import * as argon from 'argon2';
import { IUserSession } from 'src/shared/interfaces';
import * as Exception from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
    private userValidation: UserValidationService,
  ) {}

  async signup(payload: SignUpUserDto) {
    console.log({ payload });

    await this.userValidation.throwErrorIfEmail(payload.email);
    await this.userValidation.throwErrorIfUserPhoneExits(payload.phone);
    await this.userValidation.throwErrorIfUserUserName(payload.username);

    // ? hash the password with the help of argon
    payload.password = await argon.hash(payload.password);

    const userDate = this.userRepo.create(payload);
    const user = await this.userRepo.save(userDate);

    delete user.password;

    return user;
  }

  async login(payload: LoginUserDto) {
    const user = await this.userValidation.throwErrorIfUserDoesNotExitsByEmail(
      payload.email,
    );

    if (!(await this.matchPassword(payload.password, user.password))) {
      throw new Exception.ForbiddenException('Incorrect Password');
    }

    const token = await this.createUserSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      username: user.username,
    });

    // update the access token in db
    await this.userRepo.update(
      { id: user.id },
      {
        sessionToken: token,
      },
    );

    const result = await this.userRepo.findOne({
      where: { id: user.id },
    });

    delete result.password;

    return result;
  }

  async matchPassword(password: string, hashed: string) {
    const isMatched = await argon.verify(hashed, password);
    return !!isMatched;
  }

  async createUserSessionToken(payload: IUserSession): Promise<string> {
    const secretKey = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, { secret: secretKey });
  }
}
