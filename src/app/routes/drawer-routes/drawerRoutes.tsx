import {
  CreateTechnologyDrawer,
  CreateTechnologySectionDrawer,
  UpdateTechnologyDrawer,
  UpdateTechnologySectionDrawer,
} from '@/app/features/technology';
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
  {
    path: 'technology-section',
    routes: [
      {
        element: CreateTechnologySectionDrawer,
        match: 'create',
        path: '/create',
      },
      {
        element: UpdateTechnologySectionDrawer,
        match: 'update',
        path: '/update/:id',
      },
    ],
  },
  {
    path: 'technology',
    routes: [
      {
        element: CreateTechnologyDrawer,
        match: 'create',
        path: '/create',
      },
      {
        element: UpdateTechnologyDrawer,
        match: 'update',
        path: '/update/:id',
      },
    ],
  },
] as const satisfies DeepReadonly<DrawerRouter[]>;
