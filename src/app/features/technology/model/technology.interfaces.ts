import type { IconType } from '@/shared/tanstack/api/technologies';

export interface UpsertTechnologyFormEntity {
  color1: string;
  color2?: string;
  color3?: string;
  description?: string;
  iconName?: string;
  iconType: IconType;
  iconUrl?: string;
  name: string;
  rate?: number;
}
