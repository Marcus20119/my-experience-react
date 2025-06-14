import { Drawer as AntDrawer } from 'antd';
import type { DrawerProps } from 'antd/lib';

import FormWrapperDrawer from './FormWrapperDrawer';

function Drawer({ children, ...props }: DrawerProps) {
  return <AntDrawer {...props}>{children}</AntDrawer>;
}

Drawer.FormWrapper = FormWrapperDrawer;

export { Drawer };
