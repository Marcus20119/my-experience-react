import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

const TechnologyTypePage = lazy(
  () => import('@/pages/technology/TechnologyTypePage'),
);
const TechnologySectionPage = lazy(
  () => import('@/pages/technology/TechnologySectionPage'),
);

export const TECHNOLOGY_ROUTES = [
  {
    element: <TechnologyTypePage />,
    path: 'technology-type/:type',
  },
  {
    element: <TechnologySectionPage />,
    path: 'technology-type/:type/technology-section/:sectionId',
  },
  {
    element: null,
    path: 'technology-type/:type/technology-section/:sectionId/technology/:id',
  },
  {
    element: null,
    path: 'technology-type/:type/technology/:id',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
