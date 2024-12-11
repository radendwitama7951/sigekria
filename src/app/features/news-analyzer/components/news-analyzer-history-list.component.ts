import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NewsContent } from '../../../core/news-analyzer/abstract/news-content.type';

@Component({
  selector: 'news-analyzer-history-list',
  template: `
    <ul role="list">
      <h2
        class="mb-4 text-xl
      font-semibold tracking-tight
      leading-none text-white
      dark:text-white;
        "
      >
        History
      </h2>
      @for (news of userHistory; track news.id) {
        <li class="flex justify-between gap-x-6 ">
          <span
            (click)="outputOnSelect(news)"
            class="
          py-2 px-4 rounded-full
          gap-x-4 text-base
          text-gray-100
          truncate
          cursor-pointer
          hover:bg-gray-600"
          >
            {{ news.title }}
          </span>
        </li>
      } @empty {
        <span
          class="
          py-2 px-4 rounded-full
          gap-x-4 text-base
          text-gray-100
          truncate
        "
        >
          no items
        </span>
      }
    </ul>
  `,
  styles: ``,
})
export class NewsAnalyzerHistoryListComponent {
  @Input() userHistory: Array<NewsContent> = [];
  @Output() onSelect$ = new EventEmitter<NewsContent>();

  outputOnSelect(news: NewsContent) {
    this.onSelect$.emit(news);
  }
}
