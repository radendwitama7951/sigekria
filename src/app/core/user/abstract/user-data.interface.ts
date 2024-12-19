import { NewsContent } from '../../news-analyzer/abstract/news-content.type';
import { IdType } from '../../type/id.type';
import { User } from './user.interface';

export interface UserData extends User {
  id: IdType;
  history: Array<NewsContent>;
}
