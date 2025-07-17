import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { countryQueries } from './country';
import { technologyQueries, technologySectionQueries } from './technology';

export const queries = mergeQueryKeys(
  countryQueries,
  technologySectionQueries,
  technologyQueries,
);
