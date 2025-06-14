import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useGetTechnologyItems } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { Ticket } from '@/shared/components/tickethehe';

function UILibraryPage() {
  const { t } = useTranslation();
  const { technologyItems } = useGetTechnologyItems();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: t('layout.title.uiLibrary'),
    },
  ];

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.uiLibrary')}>
      <Flex className="h-fit" gap="1.5rem" wrap>
        {technologyItems.ui.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </ContentLayout>
  );
}

export default UILibraryPage;
