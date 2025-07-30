import { createRoute } from '@tanstack/react-router';

import { rootRoute } from './rootRoutes';

const animationRoute = createRoute({
  component: function Animation() {
    return <div>Animation Page</div>;
  },
  getParentRoute: () => rootRoute,
  path: '/animation',
});

export { animationRoute };
