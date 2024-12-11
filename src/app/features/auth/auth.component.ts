import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet],
  template: `
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
    :host {
      @apply flex flex-row justify-center items-center w-full min-h-dvh bg-emerald-400;
    }
  `,
})
export class AuthComponent {}
