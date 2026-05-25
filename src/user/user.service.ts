import { Inject, Injectable } from '@nestjs/common';
import type { Role, UserResponse } from './user.types.js';
import { UserInterface } from './user.interface.js';
@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userInterface: UserInterface,
  ) {}

  async updateUserRole(id: string, role: Role) {
    if (!role) {
      throw new Error('Invalid fields');
    }
    const updateUserRole = await this.userInterface.updateUserRole(id, role);
    return updateUserRole;
  }
}
