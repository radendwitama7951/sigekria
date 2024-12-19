import {
    patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { UserData } from '../abstract/user-data.interface';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { environment } from '../../../../environments/environment.development';


type UrlType = string;
type UserState = {
  user: UserData;
  isLoading: boolean;
};

const initialState: UserState = {
  user: {
    id: '',
    email: '',
    password: '',
    history: [],
  },
  isLoading: false,
};

export const UserStore = signalStore(
  withState(initialState),
  withComputed(({ user }) => ({
    userHistory: computed(() => user.history),
  })),
  withMethods((state, http = inject(HttpClient)) => ({
    getNews: rxMethod<UrlType>(
      pipe(
        distinctUntilChanged(),
        switchMap( (url) => http.post(`http://localhost:8000/api/v0/${state.user.id()}/news- `) )
        tap(() => patchState())
      )
    ),
  })),
);
