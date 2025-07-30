import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';

import { rootRoute } from './rootRoutes';

const SettingsPage = lazy(() => import('@/pages/user/SettingsPage'));

const settingRoute = createRoute({
  component: SettingsPage,
  getParentRoute: () => rootRoute,
  path: '/settings',
});

export { settingRoute };
