import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AppSharedComponentModule } from '../../../shared/components/app-shared.component.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  template: `
    <app-card>
      <div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 class="font-bold">Register</h2>
        </div>

        <div class="mt-10">
          <form
            [formGroup]="registerForm"
            (ngSubmit)="onRegister()"
            class="space-y-6"
          >
            <div>
              <label for="email">Email</label>
              <div class="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  required
                  class="app-input"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center">
                <label for="password">Password</label>
              </div>
              <div class="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="current-password"
                  required
                />
              </div>
            </div>

            <div>
              <button type="submit" class="app-button">Daftar</button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm/6 text-gray-500">
            Sudah memiliki akun ?
            <a routerLink="/auth/login">login disini</a>
          </p>
        </div>
      </div>
    </app-card>
  `,
  styles: `
    :host {
    }
  `,

  imports: [
    AppSharedComponentModule,
    RouterModule,
    RouterLink,
    ReactiveFormsModule,
  ],
})
export class RegisterFormComponent {
  private readonly router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onRegister() {
    alert('submited');
    this.router.navigate(['/news-analyzer']);
  }
}
