import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppSharedComponentModule } from '../../../shared/components/app-shared.component.module';

@Component({
  selector: 'LoginForm',
  imports: [
    AppSharedComponentModule,
    RouterLink,
    ReactiveFormsModule,
    RouterModule,
  ],
  template: `
    <app-card>
      <div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="font-bold">Login</h2>
        </div>

        <div class="mt-10">
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onLogin()"
            class="space-y-6"
          >
            <div>
              <label for="email">Email</label>
              <div class="mt-2">
                <input formControlName="email" id="email" />
              </div>
            </div>

            <div>
              <div class="flex items-center">
                <label for="password">Password</label>
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  formControlName="email"
                  autocomplete="current-password"
                />
              </div>
            </div>

            <div>
              <button type="submit" class="app-button">Masuk</button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm/6 text-gray-500">
            Belum memiliki akun ?
            <a routerLink="/auth/register">daftar disini</a>
          </p>
        </div>
      </div>
    </app-card>
  `,
  styles: `
    :host {
      display: flex;
    }
  `,
})
export class LoginFormComponent {
  private readonly router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin() {
    alert('submited');
    this.router.navigate(['/news-analyzer']);
  }
}
