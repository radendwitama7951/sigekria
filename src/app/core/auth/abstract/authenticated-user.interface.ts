import { User } from '../../user/abstract/user.interface';

export interface AuthenticatedUser extends User {
  email: string;
  password: string;
  token: string;
}
