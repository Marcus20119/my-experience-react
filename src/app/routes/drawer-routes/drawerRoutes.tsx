import FormDrawer from '@/pages/component/form/FormDrawer';
import type { DeepReadonly } from '@/shared/types';

export const DRAWER_ROUTES = [
  {
    path: 'user',
    routes: [
      {
        element: FormDrawer,
        match: 'update',
        path: '/update',
      },
    ],
  },
] as const satisfies DeepReadonly<DrawerRouter[]>;
