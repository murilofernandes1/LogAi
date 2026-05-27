import type {
  SignUpDTO,
  AdminResponse,
} from '../../common/types/auth.types.js';

export abstract class AuthInterface {
  abstract create(data: SignUpDTO): Promise<SignUpDTO>;
  abstract findByEmail(email: string): Promise<AdminResponse | null>;
}
