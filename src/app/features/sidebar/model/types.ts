import type { NavigateOptions } from '@tanstack/react-router';

export interface SidebarItem {
  children?: Omit<SidebarItem, 'children' | 'icon'>[];
  icon: React.ReactNode;
  key: string;
  label: string;
  match: string;
  navigateOptions?: NavigateOptions;
}
