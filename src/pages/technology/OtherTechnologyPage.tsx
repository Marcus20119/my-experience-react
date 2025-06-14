import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useGetTechnologyItems } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { Ticket } from '@/shared/components/Ticket';

function OtherTechnologyPage() {
  const { t } = useTranslation();
  const { technologyItems } = useGetTechnologyItems();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: t('layout.title.other'),
    },
  ];

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.other')}>
      <Flex className="h-fit" gap="1.5rem" wrap>
        {technologyItems.other.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </ContentLayout>
  );
}

export default OtherTechnologyPage;
