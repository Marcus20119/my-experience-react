import type { NavigateOptions } from '@tanstack/react-router';
import type { ItemType } from 'antd/es/menu/interface';

export interface BreadcrumbItem {
  navigateOptions?: NavigateOptions;
  onClick?: () => void;
  title: string;
}

export interface HeaderTabItem {
  label: React.ReactNode;
  menuItems?: ItemType[];
  navigateOptions: NavigateOptions;
}
