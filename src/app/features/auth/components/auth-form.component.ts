import { Component, Input } from '@angular/core';
import { AppSharedComponentModule } from '../../../shared/components/app-shared.component.module';

@Component({
  selector: 'auth-form',
  imports: [AppSharedComponentModule],
  template: `
    <app-card class="bg">
      <app-card-title>{{ title }}</app-card-title>
      <app-card-body>
        <ng-content></ng-content>
      </app-card-body>
      <app-card-footer>
        {{ footer }}
      </app-card-footer>
    </app-card>
  `,
})
export class AuthFormComponent {
  @Input() title = '';
  @Input() footer = '';
}
