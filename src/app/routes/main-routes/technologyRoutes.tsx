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
const CloudPage = lazy(() => import('@/pages/technology/cloud/CloudPage'));
const AWSPage = lazy(() => import('@/pages/technology/cloud/AWSPage'));

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
    element: <CloudPage />,
    path: 'technology/cloud',
  },
  {
    element: <AWSPage />,
    path: 'technology/cloud/aws',
  },
  {
    element: <LanguagePage />,
    path: 'technology/language',
  },
  {
    element: null,
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
