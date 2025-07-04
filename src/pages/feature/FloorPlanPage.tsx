import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';

function FloorPlanPage() {
  const { t } = useTranslation();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.floorPlan'),
    },
  ];

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.floorPlan')}>
      floor plan
    </ContentLayout>
  );
}

export default FloorPlanPage;
