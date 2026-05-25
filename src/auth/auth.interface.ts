import type { SignUpDTO, UserResponse } from '../types/auth.types.js';

export abstract class AuthInterface {
  abstract create(data: SignUpDTO): Promise<SignUpDTO>;
  abstract findByEmail(email: string): Promise<UserResponse | null>;
}
