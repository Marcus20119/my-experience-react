import { createRootRoute } from '@tanstack/react-router';

import { MainLayout, RootLayout } from '@/app/layout';

import DrawerRouter from '../drawer-routes';
import ModalRouter from '../modal-routes';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <ModalRouter />
      <DrawerRouter />
      <RootLayout>
        <MainLayout />
      </RootLayout>
    </>
  ),
});
