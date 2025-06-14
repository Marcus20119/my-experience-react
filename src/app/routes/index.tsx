import type { RouteObject } from 'react-router-dom';

import MAIN_ROUTES from '@/app/routes/main-routes';
import NotFoundPage from '@/pages/NotFoundPage';

import { MainLayout, RootLayout } from '../layout';
import DrawerRouter from './drawer-routes';
import ModalRouter from './modal-routes';

export const routes: RouteObject[] = [
  {
    children: [
      {
        children: [...MAIN_ROUTES],
        element: <MainLayout />,
        errorElement: <NotFoundPage />,
      },
    ],
    element: (
      <>
        <RootLayout />
        <ModalRouter />
        <DrawerRouter />
      </>
    ),
    path: '/',
  },
  { element: <NotFoundPage />, path: '*' },
  { element: <NotFoundPage />, path: '/404' },
];
