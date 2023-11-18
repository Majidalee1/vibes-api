import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserValidationService } from 'src/common/validations/user.validation.service';
import { JwtStrategy } from 'src/common/strateges';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || '',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserValidationService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
