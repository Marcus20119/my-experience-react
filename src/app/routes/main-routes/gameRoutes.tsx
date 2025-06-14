import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

export const GAME_ROUTES = [
  {
    element: <div>Game Page</div>,
    path: 'game',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
