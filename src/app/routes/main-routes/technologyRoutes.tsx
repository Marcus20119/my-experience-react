import { createRoute } from '@tanstack/react-router';

import TechnologyDetailPage from '@/pages/technology/TechnologyDetailPage';
import TechnologySectionPage from '@/pages/technology/TechnologySectionPage';
import TechnologyTypePage from '@/pages/technology/TechnologyTypePage';

import { rootRoute } from './rootRoutes';

const technologyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/technology-type',
});

const technologyTypeRoute = createRoute({
  component: TechnologyTypePage,
  getParentRoute: () => technologyRoute,
  path: '/$type',
});

const technologySectionRoute = createRoute({
  component: TechnologySectionPage,
  getParentRoute: () => technologyRoute,
  path: '/$type/technology-section/$sectionId',
});

const technologyOfSectionDetailRoute = createRoute({
  component: TechnologyDetailPage,
  getParentRoute: () => technologyRoute,
  path: '/$type/technology-section/$sectionId/technology/$technologyId',
});

const technologyOfTypeDetailRoute = createRoute({
  component: TechnologyDetailPage,
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
