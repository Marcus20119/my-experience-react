import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { countries } from './country';

export const queries = mergeQueryKeys(countries);
