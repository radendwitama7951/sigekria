import { inject, Injectable } from '@angular/core';
import { UserService } from '../abstract/user.service.abstract';
import { Observable, of } from 'rxjs';
import { Ok, Result } from 'ts-results';
import { IdType } from '../../type/id.type';
import { UpdateUserData } from '../abstract/update-user.interface';
import { User } from '../abstract/user.interface';
import { HttpClient } from '@angular/common/http';
import { CommonMock } from '../../../shared/constants/test/common-mock.const';
import { UserModel } from '../abstract/user.model';
import { NewsContent } from '../../news-analyzer/abstract/news-content.type';
import { HealthCheckEnum } from '../../enum/health-check.enum';

@Injectable({
  providedIn: 'root',
})
export class UserServiceImpl implements UserService {
  private readonly http = inject(HttpClient);

  health(): Observable<Result<HealthCheckEnum, unknown>> {
    return of(Ok(HealthCheckEnum.OK));
  }

  updateAccount(data: UpdateUserData): Observable<Result<UserModel, unknown>> {
    return of(Ok(CommonMock.VALID_USER));
  }

  deleteAccount(): Observable<Result<boolean, unknown>> {
    return of(Ok(true));
  }

  addHistory(newsContent: NewsContent): Observable<Result<UserModel, unknown>> {
    return of(Ok(CommonMock.VALID_USER));
  }

  deleteAllHistory(): Observable<Result<boolean, unknown>> {
    return of(Ok(true));
  }

  getAccountInfo(): Result<UserModel, unknown> {
    return Ok(CommonMock.VALID_USER);
  }
}
