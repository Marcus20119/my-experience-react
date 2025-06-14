import { useTranslation } from 'react-i18next';

import { CanvaEditor } from '@/app/features/feature/canva-editor';
import { type BreadcrumbItem, useHeaderStore } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { ContentLayout } from '@/app/layout';
import { useCalculateElementSize } from '@/shared/hooks';

function CanvaEditorPage() {
  const { t } = useTranslation();
  const { getHeaderHeight } = useHeaderStore();
  const { getSidebarWidth } = useSidebarStore();
  const { height, width } = useCalculateElementSize({
    heightOffset: getHeaderHeight(),
    widthOffset: getSidebarWidth(),
  });

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.canvaEditor'),
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      contentNoPadding
      title={t('layout.title.canvaEditor')}
    >
      <CanvaEditor
        asset={{
          image: {
            urls: [
              '/images/cat-1.png',
              '/images/cat-2.jpg',
              '/images/cat-3.jpg',
              '/images/cat-4.jpg',
              '/images/cat-5.jpg',
              '/images/cat-6.jpg',
              '/images/cat-7.jpg',
              '/images/cat-8.jpg',
              '/images/cat-9.jpg',
              '/images/cat-10.jpg',
            ],
          },
        }}
        height={height}
        width={width}
      />
    </ContentLayout>
  );
}

export default CanvaEditorPage;
