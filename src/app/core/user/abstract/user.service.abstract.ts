import { Injectable } from '@angular/core';
import { UpdateUserData } from './update-user.interface';
import { Observable } from 'rxjs';
import { Result } from 'ts-results';
import { User } from './user.interface';
import { NewsContent } from '../../news-analyzer/abstract/news-content.type';
import { IdType } from '../../type/id.type';
import { UserModel } from './user.model';
import { HealthCheckEnum } from '../../enum/health-check.enum';

export abstract class UserService {
  abstract health(): Observable<Result<HealthCheckEnum, unknown>>;
  abstract updateAccount(
    data: UpdateUserData,
  ): Observable<Result<UserModel, unknown>>;
  abstract deleteAccount(): Observable<Result<boolean, unknown>>;
  abstract addHistory(
    newHistory: NewsContent,
  ): Observable<Result<UserModel, unknown>>;
  abstract deleteAllHistory(): Observable<Result<boolean, unknown>>;
  abstract getAccountInfo(): Result<UserModel, unknown>;
}
