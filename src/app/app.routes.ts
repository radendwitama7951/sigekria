import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { LoginFormComponent } from './features/auth/components/login-form.component';
import { RegisterFormComponent } from './features/auth/components/register-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
    ],
  },
  {
    path: 'news-analyzer',
    loadComponent: () =>
      import('./features/news-analyzer/news-analyzer.component').then(
        (c) => c.NewsAnalyzerComponent,
      ),
  },
];
