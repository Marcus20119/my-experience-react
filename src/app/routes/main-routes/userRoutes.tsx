import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { rootRoute } from './rootRoutes';

const settingRoute = createRoute({
  component: lazyRouteComponent(() => import('@/pages/user/SettingsPage')),
  getParentRoute: () => rootRoute,
  path: '/settings',
});

export { settingRoute };
