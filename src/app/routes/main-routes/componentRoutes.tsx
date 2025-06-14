import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

const DailyCalendarPage = lazy(
  () => import('@/pages/component/calendar/DailyCalendarPage'),
);
const MonthlyCalendarPage = lazy(
  () => import('@/pages/component/calendar/MonthlyCalendarPage'),
);
const WeeklyCalendarPage = lazy(
  () => import('@/pages/component/calendar/WeeklyCalendarPage'),
);
const OriginalFieldPage = lazy(
  () => import('@/pages/component/field/OriginalFieldPage'),
);
const SpecialFieldPage = lazy(
  () => import('@/pages/component/field/SpecialFieldPage'),
);
const OriginalFormPage = lazy(
  () => import('@/pages/component/form/OriginalFormPage'),
);
const SpecialFormPage = lazy(
  () => import('@/pages/component/form/SpecialFormPage'),
);
const CustomizableTablePage = lazy(
  () => import('@/pages/component/table/CustomizableTablePage'),
);
const EditableTablePage = lazy(
  () => import('@/pages/component/table/EditableTablePage'),
);
const ExpandableTablePage = lazy(
  () => import('@/pages/component/table/ExpandableTablePage'),
);

export const COMPONENT_ROUTES = [
  {
    element: <CustomizableTablePage />,
    path: 'component/table/customizable',
  },
  {
    element: <EditableTablePage />,
    path: 'component/table/editable',
  },
  {
    element: <ExpandableTablePage />,
    path: 'component/table/expandable',
  },
  {
    element: <OriginalFormPage />,
    path: 'component/form/original',
  },
  {
    element: <SpecialFormPage />,
    path: 'component/form/special',
  },
  {
    element: <OriginalFieldPage />,
    path: 'component/field/original',
  },
  {
    element: <SpecialFieldPage />,
    path: 'component/field/special',
  },
  {
    element: <DailyCalendarPage />,
    path: 'component/calendar/daily',
  },
  {
    element: <WeeklyCalendarPage />,
    path: 'component/calendar/weekly',
  },
  {
    element: <MonthlyCalendarPage />,
    path: 'component/calendar/monthly',
  },
] as const satisfies DeepReadonly<RouteObject[]>;
