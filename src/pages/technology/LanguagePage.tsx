import { Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useGetTechnologyItems } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { Ticket } from '@/shared/components/Ticket';

function LanguagePage() {
  const { t } = useTranslation();
  const { technologyItems } = useGetTechnologyItems();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: t('layout.title.language'),
    },
  ];

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.language')}>
      <Flex className="h-fit" gap="1.5rem" wrap>
        {technologyItems.language.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </ContentLayout>
  );
}

export default LanguagePage;
