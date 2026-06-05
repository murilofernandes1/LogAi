import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Types = (...type: ['ADMIN' | 'DRIVER']) =>
  SetMetadata(ROLES_KEY, type);
