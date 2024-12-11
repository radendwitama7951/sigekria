import {
  AppCardBodyComponent,
  AppCardComponent,
  AppCardFooterComponent,
  AppCardTitleComponent,
} from './app-card.component';
import { NgModule } from '@angular/core';
import { AppLoadingSpinnerComponent } from './app-loading-spinner.component';

@NgModule({
  imports: [
    AppCardComponent,
    AppCardTitleComponent,
    AppCardBodyComponent,
    AppCardFooterComponent,
    AppLoadingSpinnerComponent,
  ],
  exports: [
    AppCardComponent,
    AppCardTitleComponent,
    AppCardBodyComponent,
    AppCardFooterComponent,
    AppLoadingSpinnerComponent,
  ],
})
export class AppSharedComponentModule {}
