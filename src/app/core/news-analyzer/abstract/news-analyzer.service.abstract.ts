import { Observable } from 'rxjs';
import { Result } from 'ts-results';
import { NewsContent } from './news-content.type';

export abstract class NewsAnalyzerService {
  abstract analyze(url: string): Observable<Result<NewsContent, unknown>>;
}
