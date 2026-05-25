import { UserResponse, UserRoles } from '../types/user.types.js';

export abstract class UserInterface {
  abstract updateUserRole(id: string, role: UserRoles): Promise<UserResponse>;
  abstract getMe(id: string): Promise<UserResponse>;
}
