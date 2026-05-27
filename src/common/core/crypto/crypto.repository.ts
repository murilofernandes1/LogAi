import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CryptoInterface } from './crypto.interface.js';

@Injectable()
export class CryptoRepository implements CryptoInterface {
  async hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
