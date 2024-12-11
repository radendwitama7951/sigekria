import { environment } from '../../../../environments/environment.development';

const api = environment.sigekriaApiUrl + environment.apiVersion + '/users';
export const UserEndpoints = {
  BASE: api,
  HEALTH: api + +'/health',
};
