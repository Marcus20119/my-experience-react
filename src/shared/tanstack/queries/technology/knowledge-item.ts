import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { ListKnowledgeItemsQuery } from '@/shared/tanstack/api/technologies';
import { knowledgeItemApi } from '@/shared/tanstack/api/technologies';

export const knowledgeItemQueries = createQueryKeys('knowledge-items', {
  all: (query: ListKnowledgeItemsQuery) => ({
    queryFn: () => knowledgeItemApi.getKnowledgeItems(query),
    queryKey: [query],
  }),
  detail: (id: string) => ({
    queryFn: () => knowledgeItemApi.getKnowledgeItem(id),
    queryKey: [id],
  }),
});
