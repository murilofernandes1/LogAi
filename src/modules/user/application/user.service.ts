import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UserInterface } from '../domain/user.interface.js';
import { User } from '../domain/user.entity.js';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userInterface: UserInterface,
  ) {}

  async getMe(id: string): Promise<User> {
    const user = await this.userInterface.getMe(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
