import { inject, Injectable } from '@angular/core';
import { NewsContent } from '../abstract/news-content.type';
import { AppDBService } from '../../app-db/service/app-db.service.ts.service';
import { Err, Ok, Result } from 'ts-results';
import { catchError, map, Observable, switchMap, tap } from 'rxjs';
import { filterResultOk } from 'ts-results/rxjs-operators';

@Injectable({
  providedIn: 'root',
})
export class NewsContentServiceImpl {
  private readonly appDBService = inject(AppDBService);
  async add(data: NewsContent) {
    await this.appDBService.db.collections.news_content.insert(data);
  }

  getAll(): Observable<Result<NewsContent, unknown>> {
    return this.appDBService.db.news_content.$.pipe(
      map((r) => r.previousDocumentData as unknown as NewsContent),
      map((r) => Ok(r)),
    );
  }
}
