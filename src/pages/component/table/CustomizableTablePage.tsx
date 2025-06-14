import { Tour } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { TourProps } from 'antd/lib';
import { InfoCircle } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { UserTable } from '@/app/features/component/table';
import { TableLayout } from '@/app/layout';
import { Value } from '@/shared/components';
import { useToggle } from '@/shared/hooks';

function CustomizableTablePage() {
  const { t } = useTranslation();
  const {
    onClose: onCloseTour,
    onOpen: onOpenTour,
    open: openTour,
  } = useToggle();

  const tabItems: ItemType[] = [
    {
      icon: <InfoCircle size={16} />,
      key: 'introduction',
      label: t('layout.action.introduction'),
      onClick: onOpenTour,
    },
  ];

  const steps: TourProps['steps'] = [
    {
      description: (
        <Value.List
          value={[
            t('component.tour.customizableTable.overall.description.line1'),
            t('component.tour.customizableTable.overall.description.line2'),
          ]}
        />
      ),
      placement: 'center',
      title: t('component.tour.customizableTable.overall.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.customizableTable.resize.description.line1'),
            t('component.tour.customizableTable.resize.description.line2'),
            t('component.tour.customizableTable.resize.description.line3'),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector('.resize-handle');
        return element as HTMLElement;
      },
      title: t('component.tour.customizableTable.resize.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.customizableTable.customize.description.line1'),
            t('component.tour.customizableTable.customize.description.line2'),
            t('component.tour.customizableTable.customize.description.line3'),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector('.customize-cell');
        return element as HTMLElement;
      },
      title: t('component.tour.customizableTable.customize.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.customizableTable.pagination.description.line1'),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector('.ant-pagination');
        return element as HTMLElement;
      },
      title: t('component.tour.customizableTable.pagination.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t(
              'component.tour.customizableTable.multipleSelection.description.line1',
            ),
            t(
              'component.tour.customizableTable.multipleSelection.description.line2',
            ),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector('.ant-table-selection-column');
        return element as HTMLElement;
      },
      title: t('component.tour.customizableTable.multipleSelection.title'),
    },
    {
      description: (
        <Value.List
          value={[t('component.tour.customizableTable.sort.description.line1')]}
        />
      ),
      target: () => {
        const element = document.querySelector('.ant-table-column-sorter');
        return element as HTMLElement;
      },
      title: t('component.tour.customizableTable.sort.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.customizableTable.filter.description.line1'),
            t('component.tour.customizableTable.filter.description.line2'),
          ]}
        />
      ),
      title: t('component.tour.customizableTable.filter.title'),
    },
  ];

  return (
    <TableLayout
      route={{
        path: '/component/table/customizable',
      }}
      tabItems={tabItems}
    >
      <UserTable />
      <Tour onClose={onCloseTour} open={openTour} steps={steps} />
    </TableLayout>
  );
}

export default CustomizableTablePage;
