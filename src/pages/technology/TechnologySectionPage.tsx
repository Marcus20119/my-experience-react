import type { IconifyIcon } from '@iconify/react/dist/iconify.js';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import { Flex, Image, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { AddCircle, Edit2, Trash } from 'iconsax-react';
import { capitalize } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { ContentLayout } from '@/app/layout';
import { Ticket } from '@/shared/components';
import { displayContentTranslation } from '@/shared/components/field/i18n-fields';
import { useAppRouter, useModalRouter } from '@/shared/hooks';
import { IconType } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';
import { FileTool } from '@/shared/utils/file';
import { COLOR } from '@/shared/assets/styles/constants';

const { Text } = Typography;
const { splitFileUrl } = FileTool;

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
      children: [
        {
          key: 'section',
          label: 'Section ~',
          onClick: () => {
            onOpenModal({
              path: 'technology-section/create',
            });
          },
        },
        {
          key: 'technology',
          label: 'Technology ~',
          onClick: () => {
            onOpenModal({
              path: 'technology/create',
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

  // FIX_ME: handle loading
  const { data } = useQuery({
    ...technologyQueries.all({
      filter: {
        technologySectionId: section?.id,
      },
    }),
    enabled: !!section?.id,
  });

  return (
    <ContentLayout
      actionItems={actionItems}
      breadCrumb={breadCrumb}
      tabs={headerTabs}
      title={displayContentTranslation(section?.name)}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {data?.items.map(technology => (
          <Ticket.ThreeD
            color1={technology.color1}
            color2={technology.color2}
            color3={technology.color3}
            description={technology.description}
            icon={
              technology.iconType === IconType.Custom && technology.iconUrl ? (
                <Image
                  height="50"
                  src={splitFileUrl(technology.iconUrl).url}
                  width="50"
                />
              ) : (
                <Icon
                  height="56"
                  icon={technology.iconName as unknown as IconifyIcon}
                  width="56"
                />
              )
            }
            key={technology.id}
            rate={technology.rate}
            title={technology.name}
          />
        ))}
      </Flex>
    </ContentLayout>
  );
}

export default TechnologySectionPage;
