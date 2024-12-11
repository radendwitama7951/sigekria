import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: `
    h1 {
      color: Red;
    }
  `,
})
export class AppComponent {
  title = signal('web');
}
