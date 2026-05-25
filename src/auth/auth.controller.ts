import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import type { SignUpDTO, SignInDTO, UserResponse } from './auth.types.js';
import { AuthService } from './auth.service.js';
import { AuthGuard } from '../guards/auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SignInDTO) {
    return this.authService.signin(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() request) {
    return request.user.id;
  }
}
