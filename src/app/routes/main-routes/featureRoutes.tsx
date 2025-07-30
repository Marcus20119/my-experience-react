import { createRoute, redirect } from '@tanstack/react-router';

import {
  CanvaEditorPage,
  ChartPlaygroundPage,
  DragAndDropPage,
  ExcelPage,
  FileReaderPage,
  FloorPlanPage,
  FormBuilderPage,
} from '@/pages/feature';

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
  component: CanvaEditorPage,
  getParentRoute: () => featureRoute,
  path: '/canva-editor',
});

const excelRoute = createRoute({
  component: ExcelPage,
  getParentRoute: () => featureRoute,
  path: '/excel',
});

const chartPlaygroundRoute = createRoute({
  component: ChartPlaygroundPage,
  getParentRoute: () => featureRoute,
  path: '/chart-playground',
});

const formBuilderRoute = createRoute({
  component: FormBuilderPage,
  getParentRoute: () => featureRoute,
  path: '/form-builder',
});

const dragAndDropRoute = createRoute({
  component: DragAndDropPage,
  getParentRoute: () => featureRoute,
  path: '/drag-and-drop',
});

const fileReaderRoute = createRoute({
  component: FileReaderPage,
  getParentRoute: () => featureRoute,
  path: '/file-reader',
});

const floorPlanRoute = createRoute({
  component: FloorPlanPage,
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
