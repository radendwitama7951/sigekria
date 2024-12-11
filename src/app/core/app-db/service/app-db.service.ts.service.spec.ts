import { TestBed } from '@angular/core/testing';

import { AppDbServiceTsService } from './app-db.service.ts.service';

describe('AppDbServiceTsService', () => {
  let service: AppDbServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppDbServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
