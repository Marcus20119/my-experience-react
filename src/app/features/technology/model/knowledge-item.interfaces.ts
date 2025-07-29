import type { IconType } from '@/shared/tanstack/api/technologies';
import type { Maybe } from '@/shared/types';

export interface UpsertKnowledgeItemFormEntity {
  color1: string;
  color2: Maybe<string>;
  color3: Maybe<string>;
  content: Maybe<string>;
  iconFileKey: Maybe<string>;
  iconName: Maybe<string>;
  iconType: IconType;
  imageFileKeys: Maybe<string[]>;
  knowledgeGroupId: Maybe<string>;
  name: string;
  rate: Maybe<number>;
  technologyId: string;
}
