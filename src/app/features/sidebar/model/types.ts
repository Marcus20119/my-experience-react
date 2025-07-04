import type { RouterNavigator } from '@/shared/hooks';

export interface SidebarItem {
  children?: Omit<SidebarItem, 'children' | 'icon'>[];
  icon: React.ReactNode;
  key: string;
  label: string;
  match: string;
  route: RouterNavigator;
}
