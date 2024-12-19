import {
  ApplicationConfig,
  inject,
  Injector,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { NoPreloading, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initDatabase } from './core/app-db/service/app-db.service.ts.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(NoPreloading)),
    provideClientHydration(withEventReplay()),

    provideHttpClient(withFetch()),
    // provideAppInitializer(() => initDatabase(inject(Injector))),
  ],
};
