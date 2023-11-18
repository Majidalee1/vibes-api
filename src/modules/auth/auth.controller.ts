import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto, SignUpUserDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() body: SignUpUserDto) {
    return await this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return await this.authService.login(body);
  }
}
