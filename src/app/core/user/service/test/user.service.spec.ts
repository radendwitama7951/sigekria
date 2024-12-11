import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { UserService } from '../../abstract/user.service.abstract';
import { TestBed } from '@angular/core/testing';
import { UserServiceImpl } from '.././user.service.impl';
import { provideHttpClient } from '@angular/common/http';

describe('UserService', () => {
  let userService: UserService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useClass: UserServiceImpl,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  // it(`should be able to call to ${UserEndpoints.HEALTH} on .health()`, async () => {
  //   const res = userService.health();
  //   const resCall = firstValueFrom(res);
  //   const req = httpTesting.expectOne(
  //     {
  //       url: UserEndpoints.HEALTH,
  //       method: HttpMethod.GET,
  //     },
  //     'return Ok string',
  //   );
  //   req.flush(HealthCheckEnum.OK);
  //
  //   const resVal = await resCall;
  //
  //   expect(resVal.unwrap()).toBe(HealthCheckEnum.OK);
  // });

  it(`should do anything`, () => {
    expect(true).toBeTrue();
  });
});
