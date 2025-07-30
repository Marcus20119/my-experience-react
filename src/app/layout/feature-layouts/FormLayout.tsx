import type { NavigateOptions } from '@tanstack/react-router';
import type { ItemType } from 'antd/es/menu/interface';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormStore } from '@/app/features/component/form';
import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';

interface Props {
  children?: React.ReactNode;
  navigateOptions: NavigateOptions;
  tabItems?: ItemType[];
}

function FormLayout({ children, navigateOptions, tabItems }: Props) {
  const { t } = useTranslation();
  const { setFormStates } = useFormStore();

  const mainTitle = useMemo(() => {
    switch (navigateOptions.to) {
      case '/component/form/original': {
        return t('layout.title.originalForm');
      }

      case '/component/form/special': {
        return t('layout.title.specialForm');
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
      title: t('layout.title.form'),
    },
    {
      title: mainTitle,
    },
  ];

  const headerTabs: HeaderTabItem[] = [
    {
      label: t('layout.title.originalForm'),
      navigateOptions: { to: '/component/form/original' },
    },
    {
      label: t('layout.title.specialForm'),
      navigateOptions: { to: '/component/form/special' },
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      onChangeTab={() => {
        setFormStates({
          currentStep: 1,
          multipleStepFormValue: undefined,
          singleStepFormValue: undefined,
        });
      }}
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

export default FormLayout;
