import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useGetTechnologyItems } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { Ticket } from '@/shared/components/ticket';

function ConfigurationPage() {
  const { t } = useTranslation();
  const { technologyItems } = useGetTechnologyItems();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: t('layout.title.configuration'),
    },
  ];

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      title={t('layout.title.configuration')}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {technologyItems.configuration.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </ContentLayout>
  );
}

export default ConfigurationPage;
