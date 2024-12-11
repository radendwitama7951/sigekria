import { IdType } from '../../type/id.type';

export interface NewsContent {
  id: IdType;
  title: string;
  author: string;
  publicationDate: string;
  content: string;
  sourceUrl: string;
  summary: string;
}
