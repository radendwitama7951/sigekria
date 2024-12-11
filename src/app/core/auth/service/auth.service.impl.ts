import { inject, Injectable } from '@angular/core';
import { AuthService } from '../abstract/auth.service.abstract';
import { HealthCheckEnum } from '../../enum/health-check.enum';
import { Err, Ok, Result } from 'ts-results';
import { resultMap } from 'ts-results/rxjs-operators';
import { UserCredentials } from '../abstract/user-credentials.interface';
import { User } from '../../user/abstract/user.interface';
import { AuthenticatedUser } from '../abstract/authenticated-user.interface';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthEndpoints } from '../constant/auth-endpoints.const';
import { getDatetime } from '../../../shared/utils/common/date/get-datetime.util';
import { HttpResponsePayload } from '../../type/http-response-payload.type';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceImpl implements AuthService {
  private readonly http = inject(HttpClient);
  // constructor(private readonly http: HttpClient) {}
  //

  health(): Observable<Result<HealthCheckEnum, unknown>> {
    const res = this.http.get<HttpResponsePayload<HealthCheckEnum>>(
      AuthEndpoints.HEALTH,
    );

    return res.pipe(
      map((payload: HttpResponsePayload<HealthCheckEnum>) => {
        if (!payload || payload.status !== HealthCheckEnum.SUCCESS)
          throw Error(payload.error);

        return Ok(payload.data);
      }),
      catchError((e) => {
        console.error(`[auth::health] ${getDatetime()} err: ${e}`);
        // throw e;
        return of(Err(HealthCheckEnum.UNREACHABLE));
      }),
    );
  }

  authenticateSession(
    cred: UserCredentials,
    token: string,
  ): Observable<Result<boolean, unknown>> {
    const res = this.http.post<HttpResponsePayload<boolean>>(
      AuthEndpoints.AUTHENTICATE_SESSION,
      {
        ...cred,
        token: token,
      },
    );

    /* @pipe map
     * map response data
     * to Ok($boolean)
     *
     * @params payload
     *  payload = data dari backend
     *  payload harus contain boolean
     *
     * @pipe catchError
     * map error payload
     * to Err($err_payload)
     *
     * @params e
     *  e = error payload
     *  e = could be string ??
     *
     * */
    return res.pipe(
      map((payload: HttpResponsePayload<boolean>) => {
        // <= standardized response type 👍
        if (!payload || payload.status !== HealthCheckEnum.SUCCESS)
          throw Error(payload.error);
        return Ok(payload.data);
      }),
      catchError((e) => {
        console.error(`[auth::authenticateSession] ${getDatetime()} err: ${e}`);
        return of(Err(e));
      }),
    );
  }

  login(cred: UserCredentials): Observable<Result<AuthenticatedUser, unknown>> {
    const res = this.http.post<HttpResponsePayload<AuthenticatedUser>>(
      AuthEndpoints.LOGIN,
      cred,
    );
    return res.pipe(
      map((payload: HttpResponsePayload<AuthenticatedUser>) => {
        if (!payload || payload.status !== HealthCheckEnum.SUCCESS)
          throw Error(payload.error);
        return Ok(payload.data);
      }),
      catchError((e: HttpErrorResponse) => {
        console.error(`[auth::login] ${getDatetime()} err ${e.error}`);
        return of(Err(e.error));
      }),
    );
  }

  register(
    cred: UserCredentials,
  ): Observable<Result<AuthenticatedUser, unknown>> {
    const res = this.http.post<AuthenticatedUser>(AuthEndpoints.REGISTER, cred);
    return res.pipe(
      map((payload) => {
        const data = payload;
        return Ok(data);
      }),
      catchError((e: HttpErrorResponse) => {
        console.error(`[auth::register] ${getDatetime()} err: ${e.error}`);
        return of(Err(e.error));
      }),
    );
  }

  logout(cred: UserCredentials): Observable<Result<boolean, unknown>> {
    // todo()
    return of(Ok(true));
  }
}
