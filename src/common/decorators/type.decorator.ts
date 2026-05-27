import { SetMetadata } from '@nestjs/common';

export const TYPES_KEY = 'type';
export const Types = (...type: ['DRIVER' | 'USER']) =>
  SetMetadata(TYPES_KEY, type);
