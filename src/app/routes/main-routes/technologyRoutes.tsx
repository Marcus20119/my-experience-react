import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { rootRoute } from './rootRoutes';

const technologyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/technology-type',
});

const technologyTypeRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/technology/TechnologyTypePage'),
  ),
  getParentRoute: () => technologyRoute,
  path: '/$type',
});

const technologySectionRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/technology/TechnologySectionPage'),
  ),
  getParentRoute: () => technologyRoute,
  path: '/$type/technology-section/$sectionId',
});

const technologyOfSectionDetailRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/technology/TechnologyDetailPage'),
  ),
  getParentRoute: () => technologyRoute,
  path: '/$type/technology-section/$sectionId/technology/$technologyId',
});

const technologyOfTypeDetailRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/technology/TechnologyDetailPage'),
  ),
  getParentRoute: () => technologyRoute,
  path: '/$type/technology/$technologyId',
});

export {
  technologyOfSectionDetailRoute,
  technologyOfTypeDetailRoute,
  technologyRoute,
  technologySectionRoute,
  technologyTypeRoute,
};
