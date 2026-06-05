import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '../../../common/guards/auth.guard.js';
import { UseGuards } from '@nestjs/common';
import { UserService } from '../application/user.service.js';
import { CurrentUser } from '../../../common/decorators/user.decorator.js';
import { User } from '../domain/user.entity.js';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@CurrentUser('id') id): Promise<User> {
    return this.userService.getMe(id);
  }
}
