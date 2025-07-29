import { useQuery } from '@tanstack/react-query';
import { Flex, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { AddCircle } from 'iconsax-react';
import capitalize from 'lodash-es/capitalize';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { TechnologyTicket } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { COLOR } from '@/shared/assets/styles/constants';
import { useAppRouter, useDrawerRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';

const { Text } = Typography;

function TechnologyTypePage() {
  const { t } = useTranslation();
  const { technologySkeleton } = useSidebarStore();
  const {
    param: { type },
  } = useAppRouter('/technology-type/:type');
  const { onOpenDrawer } = useDrawerRouter();

  const technologyType = technologySkeleton?.find(
    item => item.technologyType === type,
  );

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.technology'),
    },
    {
      title: capitalize(technologyType?.technologyType),
    },
  ];

  // FIX_ME: handle loading
  const { data } = useQuery({
    ...technologyQueries.all({
      filter: {
        technologyType: type as TechnologyType,
      },
    }),
    enabled: !!type,
  });

  const technologies = data?.items;

  const actionItems: ItemType[] = useMemo(() => {
    const items: ItemType[] = [
      {
        children: [
          {
            disabled: !!technologies?.length,
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
            disabled: !technologies?.length,
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
    ];

    return items?.map(item => ({
      ...item,
      children: (item as { children: ItemType[] })?.children?.filter(
        child => !(child as { disabled: boolean })?.disabled,
      ),
    })) as ItemType[];
  }, [onOpenDrawer, t, technologies?.length]);

  return (
    <ContentLayout
      actionItems={actionItems}
      breadCrumb={breadCrumb}
      title={capitalize(technologyType?.technologyType)}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {technologies?.map(technology => (
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

export default TechnologyTypePage;
