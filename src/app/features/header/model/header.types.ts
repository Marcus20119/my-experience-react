import type { ItemType } from 'antd/es/menu/interface';

import type { RouterNavigator } from '@/shared/hooks';

export interface BreadcrumbItem {
  onClick?: () => void;
  route?: RouterNavigator;
  title: string;
}

export interface HeaderTabItem {
  label: React.ReactNode;
  menuItems?: ItemType[];
  route: RouterNavigator;
}
