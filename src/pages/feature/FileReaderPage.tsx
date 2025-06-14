import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';

function FileReaderPage() {
  const { t } = useTranslation();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.fileReader'),
    },
  ];

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.fileReader')}>
      File reader page
    </ContentLayout>
  );
}

export default FileReaderPage;
