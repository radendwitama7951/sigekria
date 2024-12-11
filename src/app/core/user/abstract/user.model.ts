import { NewsContent } from '../../news-analyzer/abstract/news-content.type';
import { User } from './user.interface';

export class UserModel implements User {
  id: string = '';
  email: string = '';
  password: string = '';
  passwordLen: number = 0;
  history: Array<NewsContent> = [];
}
