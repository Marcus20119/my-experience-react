import { mergeQueryKeys } from '@lukemorales/query-key-factory';

import { countries } from './country';
import { technologySections } from './technology';

export const queries = mergeQueryKeys(countries, technologySections);
