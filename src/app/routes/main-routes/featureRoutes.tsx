import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

const CanvaEditorPage = lazy(() => import('@/pages/feature/CanvaEditorPage'));
const ExcelPage = lazy(() => import('@/pages/feature/ExcelPage'));
const ChartPlaygroundPage = lazy(
  () => import('@/pages/feature/ChartPlaygroundPage'),
);
const FormBuilderPage = lazy(() => import('@/pages/feature/FormBuilderPage'));
const DragAndDropPage = lazy(() => import('@/pages/feature/DragAndDropPage'));
const FileReaderPage = lazy(() => import('@/pages/feature/FileReaderPage'));
const FloorPlanPage = lazy(() => import('@/pages/feature/FloorPlanPage'));

export const FEATURE_ROUTES = [
  {
    element: <CanvaEditorPage />,
    path: 'feature/canva-editor',
  },
  {
    element: <ExcelPage />,
    path: 'feature/excel',
  },
  {
    element: <ChartPlaygroundPage />,
    path: 'feature/chart-playground',
  },
  {
    element: <FormBuilderPage />,
    path: 'feature/form-builder',
  },
  {
    element: <DragAndDropPage />,
    path: 'feature/drag-and-drop',
  },
  {
    element: <FileReaderPage />,
    path: 'feature/file-reader',
  },
  {
    element: <FloorPlanPage />,
    path: 'feature/floor-plan',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
