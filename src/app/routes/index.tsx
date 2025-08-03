import { createRouter } from '@tanstack/react-router';

import NotFoundPage from '@/pages/NotFoundPage';

import { ContentLayout } from '../layout';
import {
  animationRoute,
  calendarRoute,
  canvaEditorRoute,
  chartPlaygroundRoute,
  componentRoute,
  customizableTableRoute,
  dailyCalendarRoute,
  dragAndDropRoute,
  editableTableRoute,
  excelRoute,
  expandableTableRoute,
  featureRoute,
  fieldRoute,
  fileReaderRoute,
  floorPlanRoute,
  formBuilderRoute,
  formRoute,
  gameRoute,
  monthlyCalendarRoute,
  originalFieldRoute,
  originalFormRoute,
  rootRoute,
  settingRoute,
  specialFieldRoute,
  specialFormRoute,
  tableRoute,
  technologyOfSectionDetailRoute,
  technologyOfTypeDetailRoute,
  technologyRoute,
  technologySectionRoute,
  technologyTypeRoute,
  weeklyCalendarRoute,
} from './main-routes';

const routeTree = rootRoute.addChildren([
  technologyRoute.addChildren([
    technologyTypeRoute,
    technologySectionRoute,
    technologyOfTypeDetailRoute,
    technologyOfSectionDetailRoute,
  ]),
  componentRoute.addChildren([
    tableRoute.addChildren([
      editableTableRoute,
      expandableTableRoute,
      customizableTableRoute,
    ]),
    calendarRoute.addChildren([
      dailyCalendarRoute,
      weeklyCalendarRoute,
      monthlyCalendarRoute,
    ]),
    fieldRoute.addChildren([originalFieldRoute, specialFieldRoute]),
    formRoute.addChildren([originalFormRoute, specialFormRoute]),
  ]),
  featureRoute.addChildren([
    canvaEditorRoute,
    chartPlaygroundRoute,
    dragAndDropRoute,
    excelRoute,
    fileReaderRoute,
    floorPlanRoute,
    formBuilderRoute,
  ]),
  animationRoute,
  gameRoute,
  settingRoute,
]);

export const router = createRouter({
  defaultNotFoundComponent: () => <NotFoundPage />,
  defaultPendingComponent: () => <ContentLayout.Loading />,
  defaultPreload: 'intent',
  defaultViewTransition: true,
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
