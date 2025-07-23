import type { DisplayName } from '@/shared/tanstack/api/technologies';

export interface UpsertKnowledgeGroupFormEntity {
  description?: null | string;
  name: DisplayName;
  technologyId: string;
}
