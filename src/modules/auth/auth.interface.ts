import type { AuthResult, SignUpDTO } from '../../common/types/auth.types.js';
import { Auth } from './auth.entity.js';

export abstract class AuthInterface {
  abstract create(data: SignUpDTO): Promise<Auth>;
  abstract findByEmail(email: string): Promise<AuthResult | null>;
}
