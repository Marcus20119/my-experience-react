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

function FieldLayout({ children, navigateOptions, tabItems }: Props) {
  const { t } = useTranslation();

  const mainTitle = useMemo(() => {
    switch (navigateOptions.to) {
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
  }, [navigateOptions.to, t]);

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
      navigateOptions: { to: '/component/field/original' },
    },
    {
      label: t('layout.title.specialField'),
      navigateOptions: { to: '/component/field/special' },
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

export default FieldLayout;
