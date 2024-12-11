import { CommonMock } from '../../../shared/constants/test/common-mock.const';
import { AuthenticatedUser } from '../abstract/authenticated-user.interface';
import { UserCredentials } from '../abstract/user-credentials.interface';

export class AuthTestMock {
  static readonly VALID_USER_CRED: UserCredentials = {
    email: CommonMock.VALID_EMAIL,
    password: CommonMock.VALID_PASSWORD,
  };

  static readonly INVALID_USER_CRED: UserCredentials = {
    email: CommonMock.INVALID_EMAIL,
    password: CommonMock.INVALID_PASSWORD,
  };

  static readonly VALID_AUTHENTICATED_USER: AuthenticatedUser = {
    email: CommonMock.VALID_EMAIL,
    password: CommonMock.VALID_PASSWORD,
    token: CommonMock.VALID_TOKEN,
  };

  static readonly INVALID_AUTHENTICATED_USER: AuthenticatedUser = {
    email: CommonMock.INVALID_EMAIL,
    password: CommonMock.INVALID_PASSWORD,
    token: CommonMock.INVALID_TOKEN,
  };

  static readonly VALID_ACTIVE_TOKEN: string = CommonMock.VALID_TOKEN;
}
