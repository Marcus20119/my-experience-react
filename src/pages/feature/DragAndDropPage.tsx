import type { BreadcrumbItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';
import { useTranslation } from 'react-i18next';

function DragAndDropPage() {
  const { t } = useTranslation();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.dragAndDrop'),
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      title={t('layout.title.dragAndDrop')}
    >
      Drag and drop page
    </ContentLayout>
  );
}

export default DragAndDropPage;
