import { createQueryKeys } from '@lukemorales/query-key-factory';

import { restCountriesApi } from '../api/rest_countries';

export const countryQueries = createQueryKeys('countries', {
  all: (fields: Parameters<typeof restCountriesApi.getAllCountries>[0]) => ({
    queryFn: () => restCountriesApi.getAllCountries(fields),
    queryKey: [fields],
  }),
});
