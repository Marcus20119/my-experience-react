import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useGetCloudItems } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { Ticket } from '@/shared/components';

function CloudPage() {
  const { t } = useTranslation();
  const { awsItems } = useGetCloudItems();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      route: {
        path: '/technology/cloud',
      },
      title: t('layout.title.cloud'),
    },
    {
      title: t('layout.title.aws'),
    },
  ];

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.aws')}>
      <Flex className="h-fit" gap="1.5rem" wrap>
        {awsItems.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </ContentLayout>
  );
}

export default CloudPage;
