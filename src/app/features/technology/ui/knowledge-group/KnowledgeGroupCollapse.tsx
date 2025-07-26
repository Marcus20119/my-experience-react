import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import { Button, Collapse, Dropdown, Flex, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { ArrowDown2, Edit2, Trash } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/tailwind';
import { displayContentTranslation } from '@/shared/components/field/i18n-fields';
import { useDrawerRouter, useModalRouter } from '@/shared/hooks';
import type { KnowledgeGroupResponse } from '@/shared/tanstack/api/technologies';
import { knowledgeGroupQueries } from '@/shared/tanstack/queries/technology';

const { Text } = Typography;

interface Props {
  technologyId?: string;
}

function KnowledgeGroupCollapse({ technologyId }: Props) {
  const { t } = useTranslation();
  const { onOpenModal } = useModalRouter();
  const { onOpenDrawer } = useDrawerRouter();

  // FIX_ME: handle loading
  const { data } = useQuery({
    ...knowledgeGroupQueries.all({
      filter: {
        technologyId,
      },
      pagination: {
        limit: 100,
        offset: 0,
      },
    }),
    enabled: !!technologyId,
  });

  const knowledgeGroups = data?.items;

  const getCollapseItems = (group: KnowledgeGroupResponse) => {
    const actionItems: ItemType[] = [
      {
        icon: <Edit2 size="16" />,
        key: 'update',
        label: t('common.button.update'),
        onClick: () => {
          onOpenDrawer({
            param: {
              id: String(group?.id),
            },
            path: 'knowledge-group/update/:id',
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
              id: String(group?.id),
            },
            path: 'knowledge-group/delete/:id',
          });
        },
      },
    ];

    return [
      {
        children: 'hehe con cặc',
        label: (
          <Flex align="center" gap="0.75rem">
            <Text className="text-base font-semibold">
              {displayContentTranslation(group.name)}
            </Text>
            <Dropdown
              menu={{
                items: actionItems,
              }}
              popupRender={originalNode => (
                <div
                  onClick={e => e.stopPropagation()}
                  onKeyDown={e => {
                    e.stopPropagation();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {originalNode}
                </div>
              )}
            >
              <Button
                icon={
                  <Icon height="20" icon="solar:cat-bold-duotone" width="20" />
                }
                onClick={e => e.stopPropagation()}
              />
            </Dropdown>
          </Flex>
        ),
        styles: {
          header: {
            alignItems: 'center',
            padding: '0.75rem',
          },
        },
      },
    ];
  };

  return (
    <Flex className="w-full" gap="0.5rem" vertical>
      {knowledgeGroups?.map(group => (
        <Collapse
          destroyOnHidden
          expandIcon={({ isActive }) => (
            <ArrowDown2
              className={cn('transition-all', isActive ? '' : 'rotate-180')}
              size="20"
            />
          )}
          expandIconPosition="end"
          items={getCollapseItems(group)}
          key={group.id}
        />
      ))}
    </Flex>
  );
}

export default KnowledgeGroupCollapse;
