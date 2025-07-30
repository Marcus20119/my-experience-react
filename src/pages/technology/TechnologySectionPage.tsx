import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Flex, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { AddCircle, Edit2, Trash } from 'iconsax-react';
import capitalize from 'lodash-es/capitalize';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { TechnologyTicket } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { COLOR } from '@/shared/assets/styles/constants';
import { displayContentTranslation } from '@/shared/components/field/i18n-fields';
import { useDrawerRouter, useModalRouter } from '@/shared/hooks';
import { technologyQueries } from '@/shared/tanstack/queries/technology';

const { Text } = Typography;

function TechnologySectionPage() {
  const { t } = useTranslation();
  const { sectionId, type } = useParams({
    from: '/technology-type/$type/technology-section/$sectionId',
  });
  const { technologySkeleton } = useSidebarStore();
  const { onOpenModal } = useModalRouter();
  const { onOpenDrawer } = useDrawerRouter();

  const technology = technologySkeleton?.find(
    item => item.technologyType === type,
  );
  const section = technology?.technologySections?.find(
    section => section.id === sectionId,
  );

  // FIX_ME: handle loading
  const { data } = useQuery({
    ...technologyQueries.all({
      filter: {
        technologySectionId: section?.id,
      },
    }),
    enabled: !!section?.id,
  });

  const technologies = data?.items || [];

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
      navigateOptions: {
        params: {
          sectionId: section.id,
          type: technology.technologyType,
        },
        to: '/technology-type/$type/technology-section/$sectionId',
      },
    })) || [];

  const actionItems: ItemType[] = [
    {
      children: [
        {
          key: 'section',
          label: 'Section ~',
          onClick: () => {
            onOpenDrawer({
              path: 'technology-section/create',
            });
          },
        },
        {
          key: 'technology',
          label: 'Technology ~',
          onClick: () => {
            onOpenDrawer({
              path: 'technology/create',
            });
          },
        },
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
        {technologies.map(technology => (
          <TechnologyTicket
            key={technology.id}
            onClick={() => {
              onOpenDrawer({
                param: {
                  id: technology.id,
                },
                path: 'technology/update/:id',
              });
            }}
            technology={technology}
          />
        ))}
      </Flex>
    </ContentLayout>
  );
}

export default TechnologySectionPage;
