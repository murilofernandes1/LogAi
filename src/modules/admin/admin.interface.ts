import { Admin } from './admin.entity.js';

export abstract class AdminInterface {
  abstract getMe(id: string): Promise<Admin>;
}
