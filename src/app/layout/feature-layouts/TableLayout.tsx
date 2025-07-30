import type { NavigateOptions } from '@tanstack/react-router';
import type { ItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';

interface Props {
  children?: React.ReactNode;
  navigateOptions: NavigateOptions;
  tabItems?: ItemType[];
}

function TableLayout({ children, navigateOptions, tabItems }: Props) {
  const { t } = useTranslation();

  const mainTitle = useMemo(() => {
    switch (navigateOptions.to) {
      case '/component/table/customizable': {
        return t('layout.title.customizableTable');
      }

      case '/component/table/editable': {
        return t('layout.title.editableTable');
      }

      case '/component/table/expandable': {
        return t('layout.title.expandableTable');
      }

      default: {
        return '';
      }
    }
  }, [navigateOptions.to, t]);

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.component'),
    },
    {
      title: t('layout.title.table'),
    },
    {
      title: mainTitle,
    },
  ];

  const headerTabs: HeaderTabItem[] = [
    {
      label: t('layout.title.customizableTable'),
      navigateOptions: { to: '/component/table/customizable' },
    },
    {
      label: t('layout.title.editableTable'),
      navigateOptions: { to: '/component/table/editable' },
    },
    {
      label: t('layout.title.expandableTable'),
      navigateOptions: { to: '/component/table/expandable' },
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      tabs={headerTabs.map(tab => ({
        ...tab,
        menuItems:
          tab.navigateOptions.to === navigateOptions.to ? tabItems : undefined,
      }))}
      title={mainTitle}
    >
      {children}
    </ContentLayout>
  );
}

export default TableLayout;
