import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { ListTechnologiesQuery } from '@/shared/tanstack/api/technologies';
import { technologyApi } from '@/shared/tanstack/api/technologies';

export const technologyQueries = createQueryKeys('technologies', {
  all: (query: ListTechnologiesQuery) => ({
    queryFn: () => technologyApi.getTechnologies(query),
    queryKey: [query],
  }),
  detail: (id: string) => ({
    queryFn: () => technologyApi.getTechnology(id),
    queryKey: [id],
  }),
});
