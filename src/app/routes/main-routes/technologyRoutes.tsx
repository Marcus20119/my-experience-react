import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import TechnologyDetailPage from '@/pages/technology/TechnologyDetailPage';
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
    element: <TechnologyDetailPage />,
    path: 'technology-type/:type/technology-section/:sectionId/technology/:technologyId',
  },
  {
    element: <TechnologyDetailPage />,
    path: 'technology-type/:type/technology/:technologyId',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
