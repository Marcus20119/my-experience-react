import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import type { RoomEntity } from '@/app/features/feature/floor-plan';
import { FloorPlanEditor } from '@/app/features/feature/floor-plan';
import { type BreadcrumbItem, useHeaderStore } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { ContentLayout } from '@/app/layout';
import { useCalculateElementSize } from '@/shared/hooks';

function FloorPlanPage() {
  const { t } = useTranslation();
  const { getHeaderHeight } = useHeaderStore();
  const { getSidebarWidth } = useSidebarStore();
  const { height, width } = useCalculateElementSize({
    heightOffset: getHeaderHeight(),
    widthOffset: getSidebarWidth(),
  });

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.floorPlan'),
    },
  ];

  const mockedRooms: RoomEntity[] = [
    {
      desks: [
        {
          id: uuidv4(),
          name: 'Desk 1',
        },
        {
          id: uuidv4(),
          name: 'Desk 2',
        },
        {
          id: uuidv4(),
          name: 'Desk 3',
        },
      ],
      id: uuidv4(),
      name: 'Room 101',
    },
    {
      desks: [
        {
          id: uuidv4(),
          name: 'Desk 1',
        },
        {
          id: uuidv4(),
          name: 'Desk 2',
        },
        {
          id: uuidv4(),
          name: 'Desk 3',
        },
      ],
      id: uuidv4(),
      name: 'Room 102',
    },
    {
      desks: [
        {
          id: uuidv4(),
          name: 'Desk 1',
        },
        {
          id: uuidv4(),
          name: 'Desk 2',
        },
        {
          id: uuidv4(),
          name: 'Desk 3',
        },
      ],
      id: uuidv4(),
      name: 'Room 103',
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      contentNoPadding
      title={t('layout.title.floorPlan')}
    >
      <FloorPlanEditor
        floorPlanUrl="/images/floor-plan.jpg"
        height={height}
        initialRooms={mockedRooms}
        width={width}
      />
    </ContentLayout>
  );
}

export default FloorPlanPage;
