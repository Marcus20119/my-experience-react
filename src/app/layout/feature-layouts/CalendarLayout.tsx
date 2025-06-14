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

function CalendarLayout({ children, route, tabItems }: Props) {
  const { t } = useTranslation();

  const mainTitle = useMemo(() => {
    switch (route.path) {
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
  }, [route.path, t]);

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
      route: { path: '/component/calendar/daily' },
    },
    {
      label: t('layout.title.weeklyCalendar'),
      route: { path: '/component/calendar/weekly' },
    },
    {
      label: t('layout.title.monthlyCalendar'),
      route: { path: '/component/calendar/monthly' },
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

export default CalendarLayout;
