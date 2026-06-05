import {
  SignUpDTO,
  UserWithPassword,
} from '../../../common/types/auth.types.js';
import { User } from './user.entity.js';

export abstract class UserInterface {
  //----------------------------------//
  //    GENERAL INTERFACES & AUTH     //
  //----------------------------------//
  abstract getMe(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByEmailWithPassword(
    email: string,
  ): Promise<UserWithPassword | null>;
  abstract create(data: SignUpDTO): Promise<User>;

  //----------------------------------//
  //        ADMIN INTERFACES          //
  //----------------------------------//

  //----------------------------------//
  //        DRIVER INTERFACES         //
  //----------------------------------//

  abstract seeDriver(id: string): Promise<User | null>;
}
