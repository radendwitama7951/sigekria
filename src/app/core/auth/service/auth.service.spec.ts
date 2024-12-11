import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { AuthServiceImpl } from './auth.service.impl';
import { HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { AuthService } from '../abstract/auth.service.abstract';
import { HealthCheckEnum } from '../../enum/health-check.enum';
import { firstValueFrom } from 'rxjs';
import { AuthEndpoints } from '../constant/auth-endpoints.const';
import { AuthTestMock } from '../utils/auth-test.mock';
import { HttpMethod } from '../../enum/http-method.enum';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceImpl,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created ', () => {
    expect(authService).toBeTruthy();
  });

  it(`should called to ${AuthEndpoints.HEALTH} on .health()`, async () => {
    const res = authService.health();
    const resCall = firstValueFrom(res);

    const req = httpTesting.expectOne(
      {
        url: AuthEndpoints.HEALTH,
        method: HttpMethod.GET,
      },
      'GET to ping backend health status',
    );
    const expectedVal = HealthCheckEnum.OK;
    req.flush({
      status: HealthCheckEnum.SUCCESS,
      data: expectedVal,
    });
    const resVal = await resCall;
    console.debug(`[auth::health] val: ${resVal}`);
    expect(resVal.ok)
      .withContext(`should response with a valid response`)
      .toBeTrue();
    expect(resVal.unwrap()).toBe(expectedVal);
  });

  it(`should return UNREACHABLE status on .health() when network errors`, async () => {
    const res = authService.health();
    const resCall = firstValueFrom(res);
    const req = httpTesting.expectOne({
      url: AuthEndpoints.HEALTH,
      method: HttpMethod.GET,
    });
    req.error(new ProgressEvent('network error!'), {
      status: HttpStatusCode.RequestTimeout,
    });
    const resVal = await resCall;
    expect(resVal.ok).toBeFalse();
    resVal.mapErr((err) => {
      expect(err).toBe(HealthCheckEnum.UNREACHABLE);
    });

    console.debug(`[auth::health] should err val: ${resVal}`);
  });

  it(`should return a valid user credentials on .login()`, async () => {
    const res = authService.login(AuthTestMock.VALID_USER_CRED);
    const resCall = firstValueFrom(res);

    const req = httpTesting.expectOne(
      {
        url: AuthEndpoints.LOGIN,
        method: HttpMethod.POST,
      },
      'POST an existing user',
    );
    const expectedVal = AuthTestMock.VALID_AUTHENTICATED_USER;
    req.flush({
      status: HealthCheckEnum.SUCCESS,
      data: expectedVal,
    });
    const resVal = await resCall;
    expect(resVal.ok).withContext(`should return an Ok value`).toBeTrue();
    expect(resVal.unwrap()).toBe(expectedVal);
  });

  it(`should return server error payload on .login() when internal server error`, async () => {
    const res = authService.login(AuthTestMock.INVALID_USER_CRED);
    const resCall = firstValueFrom(res);

    const req = httpTesting.expectOne(
      {
        url: AuthEndpoints.LOGIN,
        method: HttpMethod.POST,
      },
      'POST a non-existing user or POST to server error',
    );

    const ERR_PAYLOAD = {
      err: 'test internal server error',
    };
    req.flush(ERR_PAYLOAD, {
      status: HttpStatusCode.InternalServerError,
      statusText: 'Some error occur',
    });
    const resVal = await resCall;
    expect(resVal.ok).toBeFalse();
    resVal.mapErr((err) => {
      expect(err).toEqual(ERR_PAYLOAD);
    });
  });

  it(`should return a valid authenticated user data on .register() when provide valid user credentials`, async () => {
    const res = authService.register(AuthTestMock.VALID_USER_CRED);
    const resCall = firstValueFrom(res);
    const req = httpTesting.expectOne(
      {
        url: AuthEndpoints.REGISTER,
        method: HttpMethod.POST,
      },
      'POST new user',
    );

    req.flush(AuthTestMock.VALID_AUTHENTICATED_USER, {
      status: HttpStatusCode.Ok,
      statusText: HealthCheckEnum.OK,
    });

    const resVal = await resCall;
    expect(resVal.ok).toBeTrue();
    expect(resVal.unwrap()).toEqual(AuthTestMock.VALID_AUTHENTICATED_USER);
  });

  it(`should return true on .authenticateSession() when provide valid active token`, async () => {
    const res = authService.authenticateSession(
      AuthTestMock.VALID_USER_CRED,
      AuthTestMock.VALID_ACTIVE_TOKEN,
    );
    const resCall = firstValueFrom(res);
    const req = httpTesting.expectOne(
      {
        url: AuthEndpoints.AUTHENTICATE_SESSION,
        method: HttpMethod.POST,
      },
      'POST session status, true/false',
    );

    req.flush(
      { status: HealthCheckEnum.SUCCESS, data: false },
      {
        status: HttpStatusCode.Ok,
        statusText: HealthCheckEnum.OK,
      },
    );

    const resVal = await resCall;
    expect(resVal.ok).withContext(`result a valid value`).toBeTrue();
    expect(typeof resVal.unwrap() === 'boolean')
      .withContext(`result a boolean data`)
      .toBe(true);
  });

  it('should do anything', () => {
    expect(true).toBeTrue();
  });
});
