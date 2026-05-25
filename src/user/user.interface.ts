import { Role } from './user.types.js';

export abstract class UserInterface {
  abstract updateUserRole(id: string, role: Role): Promise<Role>;
}
