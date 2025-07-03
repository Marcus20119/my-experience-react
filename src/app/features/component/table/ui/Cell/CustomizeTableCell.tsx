import type { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@iconify/react/dist/iconify.js';
import type { CheckboxProps } from 'antd';
import { Checkbox, Flex, Popover, Tooltip, Typography } from 'antd';
import type { AnyObject } from 'antd/lib/_util/type';
import { Refresh, Setting2 } from 'iconsax-react';
import type { Key } from 'react';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
  CustomizeColumnProps,
  CustomizeTableProps,
  DragIndexState,
  MyTableColumn,
} from '@/app/features/component/table';
import {
  DragIndexContext,
  useTableStore,
} from '@/app/features/component/table';
import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { useToggle } from '@/shared/hooks';

const { Text } = Typography;

const MAX_SHOW_ITEM = 7;

function DraggableCheckboxItem({
  id,
  style,
  ...props
}: { id: number } & Omit<CheckboxProps, 'id'>) {
  const { active } = useContext(DragIndexContext);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  const styles: React.CSSProperties = {
    ...style,
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging
      ? { position: 'relative', userSelect: 'none', zIndex: 9999 }
      : {}),
  };

  return (
    <Flex
      id={String(id)}
      ref={setNodeRef}
      {...attributes}
      align="center"
      className={cn(
        'group border-solid border-neutral-300 bg-white p-3 first-of-type:cursor-not-allowed last-of-type:cursor-not-allowed',
        active === id
          ? 'border'
          : 'border-x border-b-0 border-t last-of-type:border-b',
      )}
      justify="space-between"
      style={styles}
    >
      <Checkbox {...props} />
      <Icon
        {...listeners}
        className="cursor-move group-first-of-type:pointer-events-none group-last-of-type:pointer-events-none"
        color={COLOR.neutral[500]}
        height={14}
        icon="icon-park-outline:drag"
        width={14}
      />
    </Flex>
  );
}

interface Props {
  initialColumns: MyTableColumn<AnyObject>[];
  tableName: string;
}

function CustomizeTableCell({ initialColumns, tableName }: Props) {
  const { t } = useTranslation();
  const { onToggle, open } = useToggle();
  const {
    getTable,
    initTableColumns,
    setActiveColumnKeys,
    setOrderColumnKeys,
  } = useTableStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const [dragIndex, setDragIndex] = useState<DragIndexState>({
    active: -1,
    over: -1,
  });

  const { activeColumnKeys, columns, orderColumnKeys }: CustomizeTableProps =
    getTable(tableName);

  const orderedColumns: CustomizeColumnProps[] =
    orderColumnKeys?.map((key, i) => {
      const column = columns?.find(
        col => col.key === key,
      ) as CustomizeColumnProps;

      return {
        ...column,
        index: i,
      };
    }) ?? [];

  const handleChangeSelectedColumnKeys = (values: string[]) => {
    setActiveColumnKeys(tableName, values as Key[]);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    setDragIndex({ active: -1, over: -1 });

    if (active.id !== over?.id) {
      let overId = over.id;

      // prevent changing the first column order
      if (over.id === 0) {
        overId = 1;
      }

      // prevent changing the last column order
      if (over.id === orderedColumns.length - 1) {
        overId = orderedColumns.length - 2;
      }

      const newColumns = arrayMove(
        orderedColumns,
        Number(active.id),
        Number(overId),
      );

      const newFormattedColumns = newColumns.map((column, i) => ({
        ...column,
        index: i,
      }));

      setOrderColumnKeys?.(
        tableName,
        newFormattedColumns.map(i => i.key),
      );
    }
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const activeIndex = orderedColumns.findIndex(i => i.index === active.id);
    const overIndex = orderedColumns.findIndex(i => i.index === over?.id);

    setDragIndex({
      active: active.id,
      direction: overIndex > activeIndex ? 'bottom' : 'top',
      over: over?.id,
    });
  };

  const onReset = () => {
    setActiveColumnKeys(tableName, columns?.map(i => i.key) ?? []);
    setOrderColumnKeys(tableName, columns?.map(i => i.key) ?? []);
  };

  const shouldShowResetButton = useMemo(() => {
    if (activeColumnKeys?.length !== orderColumnKeys?.length) {
      return true;
    }

    const customizableOrder = columns?.map(i => i.key);

    if (JSON.stringify(customizableOrder) !== JSON.stringify(orderColumnKeys)) {
      return true;
    }

    return false;
  }, [activeColumnKeys, orderColumnKeys, columns]);

  return (
    <Popover
      arrow={{
        pointAtCenter: true,
      }}
      content={
        <Flex
          align="stretch"
          className="rounded-md bg-white p-4 shadow-xl"
          gap="0.75rem"
          vertical
        >
          <Flex align="center" className="relative" justify="center">
            <Text className="text-center">
              {t('common.button.customizeColumns')}
            </Text>

            {shouldShowResetButton ? (
              <Tooltip title={t('common.button.reset')}>
                <Flex
                  align="center"
                  className="absolute bottom-0 right-0 top-0 aspect-square cursor-pointer"
                  justify="center"
                  onClick={onReset}
                >
                  <Refresh size="16" />
                </Flex>
              </Tooltip>
            ) : null}
          </Flex>

          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            sensors={sensors}
          >
            <SortableContext
              items={orderedColumns.map(i => i.index)}
              strategy={verticalListSortingStrategy}
            >
              <DragIndexContext.Provider value={dragIndex}>
                <Checkbox.Group<string>
                  className={cn(
                    'flex flex-col',
                    columns?.length > MAX_SHOW_ITEM
                      ? 'overwrite-scrollbar max-h-[19.6rem] flex-nowrap overflow-y-auto overflow-x-hidden'
                      : '',
                  )}
                  onChange={handleChangeSelectedColumnKeys}
                  value={(activeColumnKeys ?? []) as string[]}
                >
                  {orderedColumns?.map((column, index) => (
                    <DraggableCheckboxItem
                      className="ml-0"
                      disabled={index === 0 || column.key === 'actions'}
                      id={column.index}
                      key={column.key}
                      value={column.key}
                    >
                      <Text className="text-neutral-700">
                        {t(column.titleI18Key)}
                      </Text>
                    </DraggableCheckboxItem>
                  ))}
                </Checkbox.Group>
              </DragIndexContext.Provider>
            </SortableContext>
          </DndContext>
        </Flex>
      }
      destroyTooltipOnHide
      onOpenChange={onToggle}
      open={open}
      overlayClassName="min-w-64"
      overlayInnerStyle={{
        padding: 0,
      }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Flex
        align="baseline"
        className="customize-cell w-full cursor-pointer"
        justify="center"
        onClick={() => {
          initTableColumns(tableName, initialColumns);
        }}
      >
        <Tooltip placement="left" title={t('common.button.customizeColumns')}>
          <Setting2 size={20} />
        </Tooltip>
      </Flex>
    </Popover>
  );
}

export { CustomizeTableCell };
