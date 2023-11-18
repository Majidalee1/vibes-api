import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWT_VERIFICATION } from 'src/shared/constants';
import { ConfigService } from '@nestjs/config';
import { IUserSession } from 'src/shared/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_VERIFICATION) {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: IUserSession) {
    const user = this.userRepo.findOne({
      where: {
        id: payload.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return payload;
  }
}
