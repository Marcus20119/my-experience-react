import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Flex, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { AddCircle, Edit2, Trash } from 'iconsax-react';
import capitalize from 'lodash-es/capitalize';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { KnowledgeGroupCollapse } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { COLOR } from '@/shared/assets/styles/constants';
import { displayContentTranslation } from '@/shared/components/field/i18n-fields';
import { useDrawerRouter, useModalRouter } from '@/shared/hooks';
import { technologyQueries } from '@/shared/tanstack/queries/technology';

const { Text } = Typography;

function TechnologyDetailPage() {
  const { t } = useTranslation();
  const { technologySkeleton } = useSidebarStore();
  const { sectionId, technologyId, type } = useParams({
    from: '/technology-type/$type/technology-section/$sectionId/technology/$technologyId',
  });
  const { onOpenModal } = useModalRouter();
  const { onOpenDrawer } = useDrawerRouter();

  const technologyType = technologySkeleton?.find(
    item => item.technologyType === type,
  );
  const section = technologyType?.technologySections?.find(
    section => section.id === sectionId,
  );

  const { data: technology } = useQuery({
    ...technologyQueries.detail(String(technologyId)),
    enabled: !!technologyId,
  });

  const breadCrumb: BreadcrumbItem[] = useMemo(() => {
    const breadCrumb: BreadcrumbItem[] = [
      {
        title: t('layout.title.technology'),
      },
      {
        navigateOptions: !section
          ? {
              params: {
                type: String(technologyType?.technologyType),
              },
              to: '/technology-type/$type',
            }
          : undefined,
        title: capitalize(technologyType?.technologyType),
      },
      {
        navigateOptions: {
          params: {
            sectionId: String(section?.id),
            type: String(technologyType?.technologyType),
          },
          to: '/technology-type/$type/technology-section/$sectionId',
        },
        title: displayContentTranslation(section?.name),
      },
      {
        title: technology ? technology.name : 'Technology ~',
      },
    ];

    return breadCrumb?.filter(item => !!item.title);
  }, [t, section, technologyType?.technologyType, technology]);

  const actionItems: ItemType[] = [
    {
      children: [
        {
          key: 'knowledge-group',
          label: 'Knowledge group ~',
          onClick: () => {
            onOpenDrawer({
              path: 'knowledge-group/create',
            });
          },
        },
      ],
      key: 'create',
      label: (
        <Flex align="center" gap="0.5rem">
          <AddCircle color={COLOR.neutral['700']} size="16" />
          <Text>{t('common.button.create')}</Text>
        </Flex>
      ),
      type: 'group',
    },
    {
      icon: <Edit2 size="16" />,
      key: 'update',
      label: t('common.button.update'),
      onClick: () => {
        onOpenDrawer({
          param: {
            id: String(technology?.id),
          },
          path: 'technology/update/:id',
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
          path: 'technology/delete/:id',
        });
      },
    },
  ];

  return (
    <ContentLayout
      actionItems={actionItems}
      breadCrumb={breadCrumb}
      title={technology ? technology.name : 'Technology ~'}
    >
      <KnowledgeGroupCollapse technologyId={technology?.id} />
    </ContentLayout>
  );
}

export default TechnologyDetailPage;
