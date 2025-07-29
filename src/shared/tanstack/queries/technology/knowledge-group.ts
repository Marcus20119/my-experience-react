import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { ListKnowledgeGroupsQuery } from '@/shared/tanstack/api/technologies';
import { knowledgeGroupApi } from '@/shared/tanstack/api/technologies';

export const knowledgeGroupQueries = createQueryKeys('knowledge-groups', {
  all: (query: ListKnowledgeGroupsQuery) => ({
    queryFn: () => knowledgeGroupApi.getKnowledgeGroups(query),
    queryKey: [query],
  }),
  detail: (id: string) => ({
    queryFn: () => knowledgeGroupApi.getKnowledgeGroup(id),
    queryKey: [id],
  }),
});
