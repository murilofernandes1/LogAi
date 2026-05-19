import { Body, Controller, Post } from '@nestjs/common';
import type { SignUpDTO, SignInDTO } from './dtos/auth.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    await this.authService.signup(body);

    return body;
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    return body;
  }
}
