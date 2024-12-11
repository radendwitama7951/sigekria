import { Observable } from 'rxjs';
import { NewsContent } from './news-content.type';
import { Result } from 'ts-results';

export abstract class NewsContentService {
  abstract add(d: NewsContent): Observable<Result<NewsContent, unknown>>;
  abstract deleteAll(): Observable<Result<number, unknown>>;
  abstract getAll(): Observable<Result<Array<NewsContent>, unknown>>;
}
