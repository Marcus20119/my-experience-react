import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from '@tanstack/react-router';

import { rootRoute } from './rootRoutes';

const featureRoute = createRoute({
  getParentRoute: () => rootRoute,
  loader: ({ location }) => {
    if (location.pathname === '/feature') {
      throw redirect({
        to: '/feature/canva-editor',
      });
    }
  },
  path: '/feature',
});

const canvaEditorRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/feature/CanvaEditorPage'),
  ),
  getParentRoute: () => featureRoute,
  path: '/canva-editor',
});

const excelRoute = createRoute({
  component: lazyRouteComponent(() => import('@/pages/feature/ExcelPage')),
  getParentRoute: () => featureRoute,
  path: '/excel',
});

const chartPlaygroundRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/feature/ChartPlaygroundPage'),
  ),
  getParentRoute: () => featureRoute,
  path: '/chart-playground',
});

const formBuilderRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/feature/FormBuilderPage'),
  ),
  getParentRoute: () => featureRoute,
  path: '/form-builder',
});

const dragAndDropRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/feature/DragAndDropPage'),
  ),
  getParentRoute: () => featureRoute,
  path: '/drag-and-drop',
});

const fileReaderRoute = createRoute({
  component: lazyRouteComponent(() => import('@/pages/feature/FileReaderPage')),
  getParentRoute: () => featureRoute,
  path: '/file-reader',
});

const floorPlanRoute = createRoute({
  component: lazyRouteComponent(() => import('@/pages/feature/FloorPlanPage')),
  getParentRoute: () => featureRoute,
  path: '/floor-plan',
});

export {
  canvaEditorRoute,
  chartPlaygroundRoute,
  dragAndDropRoute,
  excelRoute,
  featureRoute,
  fileReaderRoute,
  floorPlanRoute,
  formBuilderRoute,
};
