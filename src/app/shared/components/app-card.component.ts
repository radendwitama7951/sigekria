import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      @use '../../../styles.scss';
      :host {
        @apply app-card;
      }
      .card {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 20px;
      }
    `,
  ],
})
export class AppCardComponent {}

@Component({
  selector: 'app-card-title',
  template: `
    <h1>
      <ng-content></ng-content>
    </h1>
  `,
  styles: [
    `
      .card-title {
        margin-bottom: 10px;
      }
    `,
  ],
})
export class AppCardTitleComponent {}

@Component({
  selector: 'app-card-body',
  template: `
    <div class="card-body">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .card-body {
        margin-bottom: 10px;
      }
    `,
  ],
})
export class AppCardBodyComponent {}

@Component({
  selector: 'app-card-footer',
  template: `
    <div class="card-footer">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .card-footer {
        text-align: right;
      }
    `,
  ],
})
export class AppCardFooterComponent {}
