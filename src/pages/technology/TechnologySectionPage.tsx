import { Flex } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { AddCircle, Edit2, Trash } from 'iconsax-react';
import { capitalize } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { ContentLayout } from '@/app/layout';
import { displayContentTranslation } from '@/shared/components/field/i18n-fields';
import { useAppRouter, useModalRouter } from '@/shared/hooks';

function TechnologySectionPage() {
  const { t } = useTranslation();
  const { param } = useAppRouter(
    '/technology-type/:type/technology-section/:section',
  );
  const { onOpenModal } = useModalRouter();
  const { technologySkeleton } = useSidebarStore();

  const technology = technologySkeleton?.find(
    item => item.technologyType === param.type,
  );

  const section = technology?.technologySections?.find(
    section => section.slug === param.section,
  );

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: capitalize(technology?.technologyType),
    },
    {
      title: displayContentTranslation(section?.name),
    },
  ];

  const headerTabs: HeaderTabItem[] =
    technology?.technologySections?.map(section => ({
      label: displayContentTranslation(section.name),
      route: {
        param: {
          section: section.slug,
          type: technology.technologyType,
        },
        path: '/technology-type/:type/technology-section/:section',
      },
    })) || [];

  const actionItems: ItemType[] = [
    {
      icon: <AddCircle size="16" />,
      key: 'section',
      label: 'Section ~',
      onClick: () => {
        onOpenModal({
          path: 'technology-section/create',
        });
      },
    },
    {
      icon: <Edit2 size="16" />,
      key: 'update',
      label: t('common.button.update'),
      onClick: () => {
        onOpenModal({
          param: {
            id: String(section?.id),
          },
          path: 'technology-section/update/:id',
        });
      },
    },
    {
      icon: <Trash size="16" />,
      key: 'delete',
      label: t('common.button.delete'),
      onClick: () => {
        onOpenModal({
          param: {
            id: String(section?.id),
          },
          path: 'technology-section/delete/:id',
        });
      },
    },
  ];

  return (
    <ContentLayout
      actionItems={actionItems}
      breadCrumb={breadCrumb}
      tabs={headerTabs}
      title={displayContentTranslation(section?.name)}
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

export default TechnologySectionPage;
