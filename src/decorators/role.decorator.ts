import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Roles = (...role: ['ADMIN' | 'USER']) =>
  SetMetadata(ROLES_KEY, role);
