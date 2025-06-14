import { Flex, Popover, Typography } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useMonthlyCalendarContext } from '@/app/features/component/calendar/context';
import {
  DEFAULT_MONTHLY_COLUMN_WIDTH,
  type MonthlyCalendarEntity,
  type MonthlyGroup,
} from '@/app/features/component/calendar/model';

import { MonthlyCard } from '../Card';
import MonthlyCreateNewItemCell from './MonthlyCreateNewItemCell';

const { Text } = Typography;

interface Props<T extends MonthlyCalendarEntity> {
  disabled: boolean;
  group: MonthlyGroup<T>;
}

function MonthlyGroupCell<T extends MonthlyCalendarEntity>({
  disabled,
  group,
}: Props<T>) {
  const { t } = useTranslation();
  const { maxItemShowPerGroup } = useMonthlyCalendarContext();

  const { items } = group;

  const [columnWidth, setColumnWidth] = useState<number>(
    DEFAULT_MONTHLY_COLUMN_WIDTH,
  );

  const showItems = useMemo(
    () => items.slice(0, maxItemShowPerGroup),
    [maxItemShowPerGroup, items],
  );
  const restItems = useMemo(
    () => items.slice(maxItemShowPerGroup),
    [maxItemShowPerGroup, items],
  );

  return (
    <Flex className="overflow-y-auto" vertical>
      {showItems.map((item, _, array) => (
        <MonthlyCard
          groupCount={array.length}
          item={item}
          key={item.id}
          mode="in-calendar"
        />
      ))}

      {restItems?.length ? (
        <Flex className="cursor-pointer px-[1px] pb-[1px] pt-0.5">
          <Popover
            arrow={false}
            content={
              <Flex
                gap="0.25rem"
                style={{
                  width: columnWidth - 16,
                }}
                vertical
              >
                {restItems.map(item => (
                  <MonthlyCard
                    groupCount={restItems.length}
                    item={item}
                    key={item.id}
                    mode="in-popover"
                  />
                ))}
              </Flex>
            }
            destroyTooltipOnHide
            onOpenChange={() => {
              const getTableCellElement =
                document.querySelector('td.ant-table-cell');

              if (getTableCellElement) {
                const { width } = getTableCellElement.getBoundingClientRect();
                setColumnWidth(width);
              }
            }}
            overlayClassName="[&_.ant-popover-inner]:p-1.5"
            placement="bottom"
          >
            <Flex
              align="center"
              className="w-full rounded-sm bg-primaryLight px-1 py-0.5 shadow-card"
              justify="start"
            >
              <Text className="font-semibold">{`+${restItems.length} ${t('component.label.event')}`}</Text>
            </Flex>
          </Popover>
        </Flex>
      ) : null}

      {!restItems?.length &&
      showItems.length < maxItemShowPerGroup &&
      !disabled ? (
        <MonthlyCreateNewItemCell startTime={dayjs(group.startTime)} />
      ) : null}
    </Flex>
  );
}

export default MonthlyGroupCell;
