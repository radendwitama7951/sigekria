import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

export const NEWS_CONTENT_SCHEMA_LITERAL = {
  title: 'SIGEKRIA News Content Schema',
  description: 'Parsed data from news outlet',
  version: 0,
  keyCompression: false,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      default: '',
      maxLength: 128,
    },
    title: {
      type: 'string',
      default: '',
    },
    author: {
      type: 'string',
      default: '',
    },
    publicationDate: {
      type: 'string',
      default: '',
    },
    sourceUrl: {
      type: 'string',
      default: '',
    },
    content: {
      type: 'string',
      default: '',
    },
  },
  required: ['id', 'title', 'author', 'sourceUrl', 'content'],
} as const;

const schemaTyped = toTypedRxJsonSchema(NEWS_CONTENT_SCHEMA_LITERAL);
export type RxNewsContentDocumentType =
  ExtractDocumentTypeFromTypedRxJsonSchema<typeof schemaTyped>;

export const NEWS_CONTENT_SCHEMA: RxJsonSchema<RxNewsContentDocumentType> =
  NEWS_CONTENT_SCHEMA_LITERAL;
