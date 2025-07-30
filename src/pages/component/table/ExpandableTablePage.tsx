import { Tour, type TourProps } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { InfoCircle } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { IncomeTable } from '@/app/features/component/table';
import { TableLayout } from '@/app/layout';
import { Value } from '@/shared/components';
import { useToggle } from '@/shared/hooks';

function ExpandableTablePage() {
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
            t('component.tour.expandableTable.overall.description.line1'),
            t('component.tour.expandableTable.overall.description.line2'),
          ]}
        />
      ),
      placement: 'center',
      title: t('component.tour.expandableTable.overall.title'),
    },
    {
      description: t('component.tour.expandableTable.expand.description.line1'),
      target: () => {
        const element = document.querySelector(
          '.ant-table-row-expand-icon-collapsed',
        );
        return element as HTMLElement;
      },
      title: t('component.tour.expandableTable.expand.title'),
    },
    {
      description: t(
        'component.tour.expandableTable.collapse.description.line1',
      ),
      target: () => {
        const element = document.querySelector(
          '.ant-table-row-expand-icon-expanded',
        );
        return element as HTMLElement;
      },
      title: t('component.tour.expandableTable.collapse.title'),
    },
    {
      description: t(
        'component.tour.expandableTable.summary.description.line1',
      ),
      target: () => {
        const element = document.querySelector('.ant-table-summary');
        return element as HTMLElement;
      },
      title: t('component.tour.expandableTable.summary.title'),
    },
  ];

  return (
    <TableLayout
      navigateOptions={{
        to: '/component/table/expandable',
      }}
      tabItems={tabItems}
    >
      <IncomeTable />
      <Tour onClose={onCloseTour} open={openTour} steps={steps} />
    </TableLayout>
  );
}

export default ExpandableTablePage;
