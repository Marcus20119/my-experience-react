import type { ItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';
import type { RouterNavigator } from '@/shared/hooks';

interface Props {
  children?: React.ReactNode;
  route: RouterNavigator;
  tabItems?: ItemType[];
}

function TableLayout({ children, route, tabItems }: Props) {
  const { t } = useTranslation();

  const mainTitle = useMemo(() => {
    switch (route.path) {
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
  }, [route.path, t]);

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
      route: { path: '/component/table/customizable' },
    },
    {
      label: t('layout.title.editableTable'),
      route: { path: '/component/table/editable' },
    },
    {
      label: t('layout.title.expandableTable'),
      route: { path: '/component/table/expandable' },
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      tabs={headerTabs.map(tab => ({
        ...tab,
        menuItems: tab.route.path === route.path ? tabItems : undefined,
      }))}
      title={mainTitle}
    >
      {children}
    </ContentLayout>
  );
}

export default TableLayout;
