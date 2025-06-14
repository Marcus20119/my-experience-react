import { Icon } from '@iconify/react';
import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';
import { Ticket } from '@/shared/components';

function CloudPage() {
  const { t } = useTranslation();

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
        <Ticket.ThreeD
          color1="#f89a1c"
          icon={<Icon height="56" icon="logos:aws-ec2" width="56" />}
          title="EC2"
        />
        <Ticket.ThreeD
          color1="#9c6af0"
          icon={<Icon height="56" icon="logos:aws-athena" width="56" />}
          title="Athena"
        />
        <Ticket.ThreeD
          color1="#5e7ff3"
          icon={<Icon height="56" icon="logos:aws-neptune" width="56" />}
          title="Neptune"
        />
        <Ticket.ThreeD
          color1="#6fac4a"
          icon={<Icon height="56" icon="logos:aws-s3" width="56" />}
          title="S3"
        />
      </Flex>
    </ContentLayout>
  );
}

export default CloudPage;
