import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

const TechnologyPage = lazy(() => import('@/pages/technology/TechnologyPage'));

export const TECHNOLOGY_ROUTES = [
  {
    element: <TechnologyPage />,
    path: 'technology-type/:type',
  },
  {
    element: null,
    path: 'technology-type/:type/technology-section/:section',
  },
  {
    element: null,
    path: 'technology-type/:type/technology/:technology',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
