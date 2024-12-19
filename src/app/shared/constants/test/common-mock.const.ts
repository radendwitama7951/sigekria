import { NewsContent } from '../../../core/news-analyzer/abstract/news-content.type';
import { UserModel } from '../../../core/user/abstract/user.model';

export class CommonMock {
  static readonly VALID_EMAIL = 'test@email.com';
  static readonly INVALID_EMAIL = 'test.invalid.email.fmt.com';

  static readonly VALID_PASSWORD =
    'secure-password-442ff5da-6be3-4952-9ea9-791ab54a3474';
  static readonly INVALID_PASSWORD = 'invalid-token-123';

  static readonly VALID_TOKEN =
    'valid-token-6b073e50-acaf-4e87-82b7-b997af0d2258';
  static readonly INVALID_TOKEN = 'invalid-token-123';

  static readonly VALID_NEWS_AUTHOR = 'News Outlet.com';

  static readonly VALID_ID = 'valid-id-2aede3cc-a092-4e35-b2fc-7217d835f7e5';
  static readonly VALID_URL = 'http://some-valid-url';

  static readonly VALID_UNIX_TIME = 1733780063;
  static readonly NEWS_CONTENT =
    'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.';
  static readonly NEWS_SUMMARY =
    'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.';

  static readonly VALID_NEWS_CONTENT: NewsContent = {
    id: this.VALID_ID,
    title: 'Some News Title',
    publicationDate: '2024-12-10 14:25',
    authors: this.VALID_NEWS_AUTHOR,
    sourceUrl: this.VALID_URL,
    content: this.NEWS_CONTENT,
    summary: this.NEWS_SUMMARY,
  };
  static readonly USER_HISTORY: Array<NewsContent> = [
    this.VALID_NEWS_CONTENT,
    this.VALID_NEWS_CONTENT,
    this.VALID_NEWS_CONTENT,
  ];

  static readonly VALID_USER: UserModel = {
    id: this.VALID_ID,
    email: this.VALID_EMAIL,
    password: this.VALID_PASSWORD,
    passwordLen: this.VALID_PASSWORD.length,
    history: this.USER_HISTORY,
  };
}
