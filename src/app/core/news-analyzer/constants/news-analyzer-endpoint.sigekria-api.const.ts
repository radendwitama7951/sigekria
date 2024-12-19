import { environment } from '../../../../environments/environment.development';

const api = environment.sigekriaApiUrl + environment.sigekriaApiVersion;
export const NewsAnalyzerEndpoints = {
  BASE: api,
  ANALYZE_STREAM: api + '/analyze-url',
};
