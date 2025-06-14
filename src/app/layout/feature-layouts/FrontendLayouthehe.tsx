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

function FrontendLayout({ children, route, tabItems }: Props) {
  const { t } = useTranslation();

  const mainTitle = useMemo(() => {
    switch (route.path) {
      case '/technology/frontend/configuration': {
        return t('layout.title.configuration');
      }

      case '/technology/frontend/ui-library': {
        return t('layout.title.uiLibrary');
      }

      case '/technology/frontend/other': {
        return t('layout.title.otherTechnology');
      }

      default: {
        return '';
      }
    }
  }, [route.path, t]);

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: t('layout.title.frontend'),
    },
    {
      title: mainTitle,
    },
  ];

  const headerTabs: HeaderTabItem[] = [
    {
      label: t('layout.title.configuration'),
      route: { path: '/technology/frontend/configuration' },
    },
    {
      label: t('layout.title.uiLibrary'),
      route: { path: '/technology/frontend/ui-library' },
    },
    {
      label: t('layout.title.other'),
      route: { path: '/technology/frontend/other' },
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

export default FrontendLayout;
