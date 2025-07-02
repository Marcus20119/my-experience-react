import { Flex } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { Add } from 'iconsax-react';
import capitalize from 'lodash-es/capitalize';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { ContentLayout } from '@/app/layout';
import { useAppRouter, useModalRouter } from '@/shared/hooks';

function TechnologyPage() {
  const { t } = useTranslation();
  const { technologySkeleton } = useSidebarStore();
  const { param } = useAppRouter('/technology-type/:type');
  const { onOpenModal } = useModalRouter();

  const technology = technologySkeleton?.find(
    item => item.technologyType === param.type,
  );

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: capitalize(technology?.technologyType),
    },
  ];

  const actionItems: ItemType[] = [
    {
      icon: <Add size="16" />,
      key: 'section',
      label: 'Section ~',
      onClick: () => {
        onOpenModal({
          path: 'technology-section/create',
        });
      },
    },
  ];

  return (
    <ContentLayout
      actionItems={actionItems}
      breadCrumb={breadCrumb}
      title={capitalize(technology?.technologyType)}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {/* {languageItems.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))} */}
        {technology?.technologyType}
      </Flex>
    </ContentLayout>
  );
}

export default TechnologyPage;
