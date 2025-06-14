import FormDrawer from '@/pages/component/form/FormDrawer';
import type { DeepReadonly } from '@/shared/types';

export const DRAWER_ROUTES = [
  {
    path: 'user',
    routes: [
      {
        element: FormDrawer,
        match: 'edit',
        path: '/edit',
      },
    ],
  },
] as const satisfies DeepReadonly<DrawerRouter[]>;
