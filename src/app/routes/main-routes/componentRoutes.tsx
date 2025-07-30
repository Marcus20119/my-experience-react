import { createRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import {
  DailyCalendarPage,
  MonthlyCalendarPage,
  WeeklyCalendarPage,
} from '@/pages/component/calendar';
import { OriginalFieldPage, SpecialFieldPage } from '@/pages/component/field';
import { OriginalFormPage, SpecialFormPage } from '@/pages/component/form';
import {
  CustomizableTablePage,
  EditableTablePage,
  ExpandableTablePage,
} from '@/pages/component/table';

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
  component: CustomizableTablePage,
  getParentRoute: () => tableRoute,
  path: '/customizable',
});

const editableTableRoute = createRoute({
  component: EditableTablePage,
  getParentRoute: () => tableRoute,
  path: '/editable',
});

const expandableTableRoute = createRoute({
  component: ExpandableTablePage,
  getParentRoute: () => tableRoute,
  path: '/expandable',
});

// ----- Form routes -----
const formRoute = createRoute({
  getParentRoute: () => componentRoute,
  path: '/form',
});

const originalFormRoute = createRoute({
  component: OriginalFormPage,
  getParentRoute: () => formRoute,
  path: '/original',
});

const specialFormRoute = createRoute({
  component: SpecialFormPage,
  getParentRoute: () => formRoute,
  path: '/special',
});

// ----- Field routes -----
const fieldRoute = createRoute({
  getParentRoute: () => componentRoute,
  path: '/field',
});

const originalFieldRoute = createRoute({
  component: OriginalFieldPage,
  getParentRoute: () => fieldRoute,
  path: '/original',
});

const specialFieldRoute = createRoute({
  component: SpecialFieldPage,
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
  component: DailyCalendarPage,
  getParentRoute: () => calendarRoute,
  path: '/daily',
  validateSearch: calendarSearchSchema,
});

const weeklyCalendarRoute = createRoute({
  component: WeeklyCalendarPage,
  getParentRoute: () => calendarRoute,
  path: '/weekly',
  validateSearch: zodValidator(calendarSearchSchema),
});

const monthlyCalendarRoute = createRoute({
  component: MonthlyCalendarPage,
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
