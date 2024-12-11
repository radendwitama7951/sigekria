import { Observable } from 'rxjs';
import { HealthCheckEnum } from '../../enum/health-check.enum';
import { User } from '../../user/abstract/user.interface';
import { AuthenticatedUser } from './authenticated-user.interface';
import { UserCredentials } from './user-credentials.interface';
import { Result } from 'ts-results';

export abstract class AuthService {
  abstract health(): Observable<Result<HealthCheckEnum, unknown>>;
  abstract authenticateSession(
    userCred: UserCredentials,
    token: string,
  ): Observable<Result<boolean, unknown>>;
  abstract login(
    userCred: UserCredentials,
  ): Observable<Result<AuthenticatedUser, unknown>>;
  abstract register(
    userCred: UserCredentials,
  ): Observable<Result<AuthenticatedUser, unknown>>;
  abstract logout(
    userCred: UserCredentials,
  ): Observable<Result<boolean, unknown>>;
}
