import { User } from './user.interface';

export interface UpdateUserData extends User {
  email: string;
  password: string;
}
