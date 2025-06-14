import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

const FrontendConfigurationPage = lazy(
  () => import('@/pages/technology/frontend/FrontendConfigurationPage'),
);
const LanguagePage = lazy(() => import('@/pages/technology/LanguagePage'));
const OtherFrontEndTechnologyPage = lazy(
  () => import('@/pages/technology/frontend/OtherFrontEndTechnologyPage'),
);
const UILibraryPage = lazy(
  () => import('@/pages/technology/frontend/UILibraryPage'),
);

export const TECHNOLOGY_ROUTES = [
  {
    element: <FrontendConfigurationPage />,
    path: 'technology/frontend/configuration',
  },
  {
    element: <UILibraryPage />,
    path: 'technology/frontend/ui-library',
  },
  {
    element: <OtherFrontEndTechnologyPage />,
    path: 'technology/frontend/other',
  },
  {
    element: <LanguagePage />,
    path: 'technology/language',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
