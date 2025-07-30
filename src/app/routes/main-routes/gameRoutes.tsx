import { createRoute } from '@tanstack/react-router';

import { rootRoute } from './rootRoutes';

const gameRoute = createRoute({
  component: function Game() {
    return <div>Game Page</div>;
  },
  getParentRoute: () => rootRoute,
  path: '/game',
});

export { gameRoute };
