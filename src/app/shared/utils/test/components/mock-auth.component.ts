import { Component } from '@angular/core';
import { AuthComponent } from '../../../../features/auth/auth.component';

@Component({
  selector: 'mock-auth',
  template: '<p>Auth Page</p>',
})
export class MockAuthComponent extends AuthComponent {}
