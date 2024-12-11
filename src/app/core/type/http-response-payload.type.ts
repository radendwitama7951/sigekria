import { HealthCheckEnum } from '../enum/health-check.enum';

export type HttpResponsePayload<T, E = string> =
  | { status: HealthCheckEnum; data: never; error: E }
  | { status: HealthCheckEnum; data: T; error: never };
