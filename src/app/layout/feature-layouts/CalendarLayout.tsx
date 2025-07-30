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

function CalendarLayout({ children, navigateOptions, tabItems }: Props) {
  const { t } = useTranslation();

  const mainTitle = useMemo(() => {
    switch (navigateOptions.to) {
      case '/component/calendar/daily': {
        return t('layout.title.dailyCalendar');
      }

      case '/component/calendar/weekly': {
        return t('layout.title.weeklyCalendar');
      }

      case '/component/calendar/monthly': {
        return t('layout.title.monthlyCalendar');
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
      title: t('layout.title.calendar'),
    },
    {
      title: mainTitle,
    },
  ];

  const headerTabs: HeaderTabItem[] = [
    {
      label: t('layout.title.dailyCalendar'),
      navigateOptions: { to: '/component/calendar/daily' },
    },
    {
      label: t('layout.title.weeklyCalendar'),
      navigateOptions: { to: '/component/calendar/weekly' },
    },
    {
      label: t('layout.title.monthlyCalendar'),
      navigateOptions: { to: '/component/calendar/monthly' },
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

export default CalendarLayout;
