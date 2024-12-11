import { User } from '../../user/abstract/user.interface';

export interface UserCredentials extends User {
  email: string;
  password: string;
}
