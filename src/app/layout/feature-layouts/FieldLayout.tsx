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

function FieldLayout({ children, route, tabItems }: Props) {
  const { t } = useTranslation();

  const mainTitle = useMemo(() => {
    switch (route.path) {
      case '/component/field/original': {
        return t('layout.title.originalField');
      }

      case '/component/field/special': {
        return t('layout.title.specialField');
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
      title: t('layout.title.field'),
    },
    {
      title: mainTitle,
    },
  ];

  const headerTabs: HeaderTabItem[] = [
    {
      label: t('layout.title.originalField'),
      route: { path: '/component/field/original' },
    },
    {
      label: t('layout.title.specialField'),
      route: { path: '/component/field/special' },
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

export default FieldLayout;
