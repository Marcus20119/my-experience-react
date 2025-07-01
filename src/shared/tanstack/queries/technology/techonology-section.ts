import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { ListTechnologySectionsQuery } from '@/shared/tanstack/api/technologies';
import { technologySectionApi } from '@/shared/tanstack/api/technologies';

export const technologySections = createQueryKeys('technology-sections', {
  all: (query: ListTechnologySectionsQuery) => ({
    queryFn: () => technologySectionApi.getTechnologySections(query),
    queryKey: [query],
  }),
  detail: (id: string) => ({
    queryFn: () => technologySectionApi.getTechnologySection(id),
    queryKey: [id],
  }),
  skeleton: () => ({
    queryFn: () => technologySectionApi.getTechnologySkeleton(),
    queryKey: ['skeleton'],
  }),
});
