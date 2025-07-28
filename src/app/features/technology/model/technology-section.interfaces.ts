import type {
  DisplayName,
  TechnologyType,
} from '@/shared/tanstack/api/technologies';

export interface UpsertTechnologySectionFormEntity {
  name: DisplayName;
  technologyType: TechnologyType;
}
