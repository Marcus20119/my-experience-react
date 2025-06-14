import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

const ConfigurationPage = lazy(
  () => import('@/pages/technology/ConfigurationPage'),
);
const LanguagePage = lazy(() => import('@/pages/technology/LanguagePage'));
const OtherTechnologyPage = lazy(
  () => import('@/pages/technology/OtherTechnologyPage'),
);
const UILibraryPage = lazy(() => import('@/pages/technology/UILibraryPage'));

export const TECHNOLOGY_ROUTES = [
  {
    element: <ConfigurationPage />,
    path: 'technology',
  },
  {
    element: <ConfigurationPage />,
    path: 'technology/configuration',
  },
  {
    element: <LanguagePage />,
    path: 'technology/language',
  },
  {
    element: <UILibraryPage />,
    path: 'technology/ui-library',
  },
  {
    element: <OtherTechnologyPage />,
    path: 'technology/other',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
