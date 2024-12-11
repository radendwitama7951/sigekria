import { TestBed } from '@angular/core/testing';
import { NewsAnalyzerService } from '../../abstract/news-content.service.abstract';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { NewsAnalyzerServiceImpl } from '../news-analyzer.service.impl';
import { provideHttpClient } from '@angular/common/http';
import { async, firstValueFrom } from 'rxjs';
import { HttpMethod } from '../../../enum/http-method.enum';

describe('news analyzer service', () => {
  let newsAnalyzerService: NewsAnalyzerService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NewsAnalyzerService,
          useClass: NewsAnalyzerServiceImpl,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    newsAnalyzerService = TestBed.inject(NewsAnalyzerServiceImpl);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created ', () => {
    expect(newsAnalyzerService).toBeTruthy();
  });

  it(`should return some news`, async () => {
    const res = newsAnalyzerService.analyze('some');
    const resCall = firstValueFrom(res);

    const req = httpTesting.expectOne(
      {
        url: 'https://useragents.io/uas/newspaperjs_4e62bce8b5d2582c53e71aa0e7b6293a',
        method: HttpMethod.GET,
      },
      'GET to ping backend health status',
    );
    req.flush({
      some_data:
        'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.',
    });
    const resVal = await resCall;
    expect(resVal.ok).toBeTrue();
  });
});
