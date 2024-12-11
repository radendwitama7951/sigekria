import { InjectionToken } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

const api = environment.sigekriaApiUrl + environment.apiVersion + '/auth';
export const AuthEndpoints = {
  BASE: api,
  HEALTH: api + '/health',
  LOGIN: api + '/login',
  REGISTER: api + '/register',
  AUTHENTICATE_SESSION: api + '/authenticate-session',
};
