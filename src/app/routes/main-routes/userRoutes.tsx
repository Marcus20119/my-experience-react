import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

const SettingsPage = lazy(() => import('@/pages/user/SettingsPage'));

export const USER_ROUTES = [
  {
    element: <SettingsPage />,
    path: 'settings',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
