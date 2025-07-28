import type {
  IconType,
  TechnologyType,
} from '@/shared/tanstack/api/technologies';
import type { Maybe } from '@/shared/types';

export interface UpsertTechnologyFormEntity {
  color1: string;
  color2: Maybe<string>;
  color3: Maybe<string>;
  description: Maybe<string>;
  iconFileKey: Maybe<string>;
  iconName: Maybe<string>;
  iconType: IconType;
  name: string;
  rate?: number;
  technologySectionId: Maybe<string>;
  technologyType: TechnologyType;
}
