import { NewsAnalyzerService } from '../abstract/news-analyzer.service.abstract';

export class NewsAnalyzerServiceSigekriaApiImpl implements NewsAnalyzerService {
  analyze(url: string): Observable<Result<NewsContent, unknown>> {}
}
