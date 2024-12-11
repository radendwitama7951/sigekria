import { NewsContent } from '../abstract/news-content.type';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type NewsContentState = {
  newsContents: Array<NewsContent>;
  isLoading: boolean;
};

const initialState: NewsContentState = {
  newsContents: [],
  isLoading: false,
};

export const NewsContentStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    add: (d: NewsContent) =>
      patchState(store, (state) => ({
        newsContents: [...state.newsContents, d],
      })),
    deleteAll: () =>
      patchState(store, (state) => ({
        newsContents: [],
      })),
  })),
);

// @Injectable({
//   providedIn: 'root',
// })
// export class NewsContentServiceNgrxSignalImpl implements NewsContentService {
//   private readonly store = inject(NewsContentStore);
//
//   add(d: NewsContent) {
//     this.store.add(d);
//   }
//
//   deleteAll() {
//     this.store.deleteAll();
//   }
//
//   getAll(): Observable<Array<NewsContent>> {
//     return of(this.store.newsContents);
//   }
//
//
// }
