import { inject, Injectable } from '@angular/core';
import { NewsAnalyzerService } from '../abstract/news-analyzer.service.abstract';
import { filter, Observable, of, switchMap } from 'rxjs';
import { Ok, Result } from 'ts-results';
import { NewsContent } from '../abstract/news-content.type';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { NewsAnalyzerEndpoints } from '../constants/news-analyzer-endpoint.sigekria-api.const';
import { HttpMethod } from '../../enum/http-method.enum';
import { CommonMock } from '../../../shared/constants/test/common-mock.const';

@Injectable({
  providedIn: 'root',
})
export class NewsAnalyzerServiceFastapiStreamImpl
  implements NewsAnalyzerService
{
  private readonly http = inject(HttpClient);

  analyze(url: string): Observable<Result<NewsContent, unknown>> {
    const xhr = new XMLHttpRequest();
    xhr.open(
      HttpMethod.GET,
      NewsAnalyzerEndpoints.ANALYZE_STREAM +
        `?news_url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F64591508%2Ftypescript-add-object-to-array-with-spread`,
      true,
    );
    // Set up progress event listener
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        console.log(`Upload progress: ${progress}%`);
      }

      if (event.target) console.log('event target');
      else console.log('meh');
      event.target?.addEventListener('stream', (r) => console.log(r));
    };

    // Set up response event listeners
    xhr.onload = () => {
      if (xhr.status === 200) {
        // Handle successful response
        console.log('Upload complete:', xhr.responseText);
      } else {
        // Handle error response
        console.error('Upload failed:', xhr.statusText);
      }
    };

    xhr.onerror = (error) => {
      console.error('Upload error:', error);
    };

    // Send the file data
    xhr.send();

    return of(Ok(CommonMock.VALID_NEWS_CONTENT));
  }
}
