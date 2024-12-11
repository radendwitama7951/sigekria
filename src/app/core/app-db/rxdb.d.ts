import { RxCollection, RxDatabase, RxDocument } from 'rxdb';
import { RxNewsContentDocumentType } from './schema/news-content.schema';
import { Signal } from '@angular/core';

type RxNewsContentDocMethods = {};

export type RxNewsContentDocument = RxDocument<
  RxNewsContentDocumentType,
  RxNewsContentDocMethods
>;

export type RxNewsContentCollection = RxCollection<
  RxNewsContentDocumentType,
  RxNewsContentDocMethods,
  unknown,
  unknown,
  Signal<unknown>
>;

export type RxNewsContentCollections = {
  news_content: RxNewsContentCollection;
};

export type RxNewsContentDatabase = RxDatabase<
  RxNewsContentCollections,
  unknown,
  unknown,
  Signal<unknown>
>;
