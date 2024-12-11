import {
  Component,
  computed,
  inject,
  resource,
  ResourceStatus,
  signal,
} from '@angular/core';
import { NewsAnalyzerInputComponent } from './components/news-analyzer-input.component';
import { NewsAnalyzerResultComponent } from './components/news-analyzer-result.component';
import { NewsAnalyzerHistoryListComponent } from './components/news-analyzer-history-list.component';
import { NewsContent } from '../../core/news-analyzer/abstract/news-content.type';
import { CommonMock } from '../../shared/constants/test/common-mock.const';
import { NewsAnalyzerServiceImpl } from '../../core/news-analyzer/service/news-analyzer.service.impl';
import { distinctUntilChanged, filter, map, Observable, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { filterResultOk, resultMap } from 'ts-results/rxjs-operators';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { AppLoadingSpinnerComponent } from '../../shared/components/app-loading-spinner.component';
import { NewsContentStore } from '../../core/news-analyzer/service/news-content.service.ngrx-signals.impl';

const emptyNewsContent: NewsContent = {
  id: '',
  title: '',
  author: '',
  content: '',
  publicationDate: '',
  sourceUrl: '',
  summary: '',
};

@Component({
  selector: 'app-news-analyzer',
  template: `
    <!-- drawer init and toggle -->
    <div class="fixed top-4 left-4 z-50">
      <button
        #drawerButton
        (click)="showHistoryDrawer.set(!showHistoryDrawer())"
        class="icon-btn"
        type="button"
        data-drawer-target="drawer-example"
        data-drawer-show="drawer-example"
        aria-controls="drawer-example"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <!-- drawer component -->
    <div
      id="history-drawer"
      class="drawer"
      [class.translate-x-0]="showHistoryDrawer()"
      [class.-translate-x-full]="!showHistoryDrawer()"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      @defer (on interaction(drawerButton)) {
        <news-analyzer-history-list
          [userHistory]="userHistory()"
          (onSelect$)="onDisplayHistory($event)"
        />
      } @placeholder {
        <p>History</p>
      }
    </div>

    <div class="flex flex-col items-center w-100 mb-10">
      <h1 class="title">{{ title }}</h1>
      <h2 class="subtitle">{{ subtitle }}</h2>
    </div>
    <news-analyzer-input #requestAnalysis (onSend$)="requestNews.set($event)" />

    @defer (when requestNews()) {
      <news-analyzer-result
        [isLoading]="someNews.isLoading()"
        [newsContent]="someNews.value()!"
      />
    } @placeholder {
      <span></span>
    } @loading (minimum 2s) {
      <app-loading-spinner />
    }
  `,
  styles: `
    :host {
      @apply flex flex-col items-center
      my-20;
    }

    .drawer {
      @apply fixed top-0
      left-0 z-40
      h-screen pt-20 px-8
      overflow-y-auto transition-transform
      bg-white w-80
      dark:bg-gray-800;
    }

    .title {
      @apply mb-4 text-4xl
      font-extrabold tracking-normal
      leading-none text-gray-900
      dark:text-white lg:text-6xl md:text-5xl
      dark:text-white;

      /*   @apply mb-4 text-4xl // */
      /* font-extrabold leading-none // */
      /* tracking-tight text-gray-900 // */
      /* md:text-5xl lg:text-6xl // */
      /* dark:text-white; */
    }
    .subtitle {
      @apply mb-4 text-xl
      font-normal tracking-tight
      leading-none text-gray-900
      dark:text-white;
    }
  `,

  imports: [
    CommonModule,
    NewsAnalyzerInputComponent,
    NewsAnalyzerResultComponent,
    NewsAnalyzerHistoryListComponent,
    AppLoadingSpinnerComponent,
  ],
  providers: [NewsContentStore],
})
export class NewsAnalyzerComponent {
  private readonly newsAnalyzerService = inject(NewsAnalyzerServiceImpl);
  // private readonly appDBService = inject(AppDBService);
  private readonly newsContentStore = inject(NewsContentStore);

  requestNews = signal<string>('');
  // someNews = new Observable<NewsContent>();
  someNews = rxResource({
    request: () => this.requestNews(),
    loader: ({ request }) =>
      request !== ''
        ? this.newsAnalyzerService.analyze(request).pipe(
            distinctUntilChanged(),
            filterResultOk(),
            tap((v) =>
              console.debug(
                `[NewsAnalyzerComponent::someNews] v => ${v.title}`,
              ),
            ),
            tap((v) => this.newsContentStore.add(v)),
          )
        : of(emptyNewsContent),
  });

  showHistoryDrawer = signal(false);
  userHistory = this.newsContentStore.newsContents;

  title = 'SIGEKRIA';
  subtitle = 'Sistem Generasi Kesimpulan Media Berita';

  showResult = computed(
    () => this.someNews.status() == ResourceStatus.Resolved,
  );

  onDisplayHistory(news: NewsContent) {
    alert('history news: ' + news.content);
  }
}
