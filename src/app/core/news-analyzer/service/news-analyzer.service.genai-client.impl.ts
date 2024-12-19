import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { Err, Ok, Result } from 'ts-results';
import { NewsAnalyzerService } from '../abstract/news-analyzer.service.abstract';
import { NewsContent } from '../abstract/news-content.type';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { environment } from '../../../../environments/environment.development';

const genAI = new GoogleGenerativeAI(environment.chatGeminiAPI);

const genAIResponseSchema = {
  description: 'List of recipes',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      id: {
        type: SchemaType.STRING,
        description: 'Source URL of the article',
        nullable: false,
      },
      title: {
        type: SchemaType.STRING,
        description: 'Title of the article',
        nullable: false,
      },
      author: {
        type: SchemaType.STRING,
        description: 'Author or news outlet of article',
        nullable: false,
      },
      publicationDate: {
        type: SchemaType.STRING,
        description:
          "Publication's date and time of the article; null if not available",
        nullable: true,
      },
      sourceUrl: {
        type: SchemaType.STRING,
        description: 'URL of the article; null if prompted url is not valid',
        nullable: true,
      },
      content: {
        type: SchemaType.STRING,
        description: 'Full text of the article',
        nullable: false,
      },
      summary: {
        type: SchemaType.STRING,
        description: 'Summary of the article',
        nullable: false,
      },
    },
    required: [
      'id',
      'title',
      'author',
      'publicationDate',
      'sourceUrl',
      'content',
      'summary',
    ],
  },
};

@Injectable({
  providedIn: 'root',
})
export class NewsAnalyzerServiceGenaiClientImpl implements NewsAnalyzerService {
  private readonly platform = inject(PLATFORM_ID);

  private readonly model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: genAIResponseSchema,
      temperature: 0.69,
    },
  });

  private geminiService(url: string): Observable<Result<NewsContent, unknown>> {
    const prompt = `Parse and summarize article from ${url}; return null if sourceUrl is not a valid news url`;
    return from(this.model.generateContent(prompt)).pipe(
      tap(() =>
        console.debug(
          `[NewsAnalyzerServiceImpl::geminiService] platform => ${this.platform}`,
        ),
      ),
      tap((r) =>
        console.debug(
          `[NewsAnalyzerServiceImpl::geminiService] r => ${r.response.text()}`,
        ),
      ),
      map((r) => JSON.parse(r.response.text())[0] as NewsContent),
      tap((r) =>
        console.debug(
          `[NewsAnalyzerServiceImpl::geminiService] r => ${r.sourceUrl}`,
        ),
      ),
      map((r) => (r.sourceUrl ? Ok(r) : Err('Invalid input url'))),
      catchError((e) => of(Err(e))),
    );
  }

  analyze(url: string): Observable<Result<NewsContent, unknown>> {
    return this.geminiService(url);
  }
}
