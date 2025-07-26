import { useQuery } from '@tanstack/react-query';
import { Flex } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { AddCircle } from 'iconsax-react';
import capitalize from 'lodash-es/capitalize';
import { useTranslation } from 'react-i18next';

import type { BreadcrumbItem } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { TechnologyTicket } from '@/app/features/technology';
import { ContentLayout } from '@/app/layout';
import { useAppRouter, useDrawerRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';

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

  const actionItems: ItemType[] = [
    {
      disabled: !!technologies?.length,
      icon: <AddCircle size="16" />,
      key: 'section',
      label: 'Section ~',
      onClick: () => {
        onOpenDrawer({
          path: 'technology-section/create',
        });
      },
    },
    {
      icon: <AddCircle size="16" />,
      key: 'technology',
      label: 'Technology ~',
      onClick: () => {
        onOpenDrawer({
          path: 'technology/create',
        });
      },
    },
    {
      icon: <AddCircle size="16" />,
      key: 'knowledge-group',
      label: 'Knowledge group ~',
      onClick: () => {
        onOpenDrawer({
          path: 'knowledge-group/create',
        });
      },
    },
  ];

  return (
    <ContentLayout
      actionItems={actionItems}
      breadCrumb={breadCrumb}
      title={capitalize(technologyType?.technologyType)}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {data?.items.map(technology => (
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
