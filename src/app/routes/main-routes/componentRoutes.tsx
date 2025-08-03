import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { rootRoute } from './rootRoutes';

const componentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/component',
});

// ----- Table routes -----
const tableRoute = createRoute({
  getParentRoute: () => componentRoute,
  path: '/table',
});

const customizableTableRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/table/CustomizableTablePage'),
  ),
  getParentRoute: () => tableRoute,
  path: '/customizable',
});

const editableTableRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/table/EditableTablePage'),
  ),
  getParentRoute: () => tableRoute,
  path: '/editable',
});

const expandableTableRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/table/ExpandableTablePage'),
  ),
  getParentRoute: () => tableRoute,
  path: '/expandable',
});

// ----- Form routes -----
const formRoute = createRoute({
  getParentRoute: () => componentRoute,
  path: '/form',
});

const originalFormRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/form/OriginalFormPage'),
  ),
  getParentRoute: () => formRoute,
  path: '/original',
});

const specialFormRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/form/SpecialFormPage'),
  ),
  getParentRoute: () => formRoute,
  path: '/special',
});

// ----- Field routes -----
const fieldRoute = createRoute({
  getParentRoute: () => componentRoute,
  path: '/field',
});

const originalFieldRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/field/OriginalFieldPage'),
  ),
  getParentRoute: () => fieldRoute,
  path: '/original',
});

const specialFieldRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/field/SpecialFieldPage'),
  ),
  getParentRoute: () => fieldRoute,
  path: '/special',
});

// ----- Calendar routes -----
const calendarRoute = createRoute({
  getParentRoute: () => componentRoute,
  path: '/calendar',
});

const calendarSearchSchema = z.object({
  baseDate: z.string().optional(),
});

const dailyCalendarRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/calendar/DailyCalendarPage'),
  ),
  getParentRoute: () => calendarRoute,
  path: '/daily',
  validateSearch: zodValidator(calendarSearchSchema),
});

const weeklyCalendarRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/calendar/WeeklyCalendarPage'),
  ),
  getParentRoute: () => calendarRoute,
  path: '/weekly',
  validateSearch: zodValidator(calendarSearchSchema),
});

const monthlyCalendarRoute = createRoute({
  component: lazyRouteComponent(
    () => import('@/pages/component/calendar/MonthlyCalendarPage'),
  ),
  getParentRoute: () => calendarRoute,
  path: '/monthly',
  validateSearch: zodValidator(calendarSearchSchema),
});

export {
  calendarRoute,
  componentRoute,
  customizableTableRoute,
  dailyCalendarRoute,
  editableTableRoute,
  expandableTableRoute,
  fieldRoute,
  formRoute,
  monthlyCalendarRoute,
  originalFieldRoute,
  originalFormRoute,
  specialFieldRoute,
  specialFormRoute,
  tableRoute,
  weeklyCalendarRoute,
};
