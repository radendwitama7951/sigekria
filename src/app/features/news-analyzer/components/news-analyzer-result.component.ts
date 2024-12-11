import { Component, Input } from '@angular/core';
import { AppSharedComponentModule } from '../../../shared/components/app-shared.component.module';
import { NewsContent } from '../../../core/news-analyzer/abstract/news-content.type';
import { CommonMock } from '../../../shared/constants/test/common-mock.const';

@Component({
  selector: 'news-analyzer-result',
  imports: [AppSharedComponentModule],
  template: ` @if (isLoading) {
      <app-loading-spinner />
    } @else {
      <app-card class="w-4/5">
        <app-card-title>{{ newsContent.title }}</app-card-title>
        <app-card-body>
          <br />
          <h2>Author:</h2>
          <p>{{ newsContent.author }}</p>
          <br />
          <h2>Publication Date: {{ newsContent.publicationDate }}</h2>
          <h2>Summary:</h2>
          <p>{{ newsContent.summary }}</p>
        </app-card-body>
      </app-card>
    }`,
  styles: `
    :host {
      @apply flex justify-center
      w-screen;
    }
  `,
})
export class NewsAnalyzerResultComponent {
  @Input() isLoading = true;
  @Input() newsContent: NewsContent = CommonMock.VALID_NEWS_CONTENT;
}
