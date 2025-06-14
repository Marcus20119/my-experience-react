import { Flex, Popover, Typography } from 'antd';
import { useMemo } from 'react';

import { useDailyCalendarContext } from '@/app/features/component/calendar/context';
import { getTimeInMinutes } from '@/app/features/component/calendar/lib';
import type {
  DailyCalendarEntity,
  DailyGroup,
} from '@/app/features/component/calendar/model';
import { DEFAULT_WEEKLY_COLUMN_WIDTH } from '@/app/features/component/calendar/model';

import { DailyCard } from '../Card';

const { Text } = Typography;

interface Props<T extends DailyCalendarEntity> {
  group: DailyGroup<T>;
  order: number;
}

function DailyGroupCell<T extends DailyCalendarEntity>({
  group,
  order,
}: Props<T>) {
  const { hourCellHeight, maxItemShowPerGroup, startHour } =
    useDailyCalendarContext();

  const { items, startTime } = group;

  const showItems = useMemo(
    () => items.slice(0, maxItemShowPerGroup),
    [maxItemShowPerGroup, items],
  );
  const restItems = useMemo(
    () => items.slice(maxItemShowPerGroup),
    [maxItemShowPerGroup, items],
  );

  const top = useMemo(() => {
    const startTimeInMinutes = getTimeInMinutes(startTime);
    const startHourInMinutes = startHour * 60;

    return ((startTimeInMinutes - startHourInMinutes) * hourCellHeight) / 60;
  }, [hourCellHeight, startHour, startTime]);

  if (!group.startTime || !group.items.length) return null;

  return (
    <>
      {showItems.map((item, index, array) => {
        const left = restItems?.length
          ? `calc(${(index / array.length) * 100}% - ${(index / array.length) * 28}px)`
          : `${(index / array.length) * 100}%`;

        const width = restItems?.length
          ? `calc(${(1 / array.length) * 100}%  - ${28 / array.length}px)`
          : `${(1 / array.length) * 100}%`;

        return (
          <div
            className="calendar-item absolute"
            key={item.id}
            style={{
              left,
              top,
              width,
              zIndex: order + 1, // prevent z-index = 0
            }}
          >
            <DailyCard
              groupCount={array.length}
              item={item}
              key={item.id}
              mode="in-calendar"
            />
          </div>
        );
      })}

      {restItems?.length ? (
        <Flex
          className="absolute right-0 h-8 w-7 cursor-pointer px-[1px] py-0.5"
          style={{
            top,
          }}
        >
          <Popover
            arrow={false}
            content={
              <Flex
                gap="0.25rem"
                style={{
                  width: DEFAULT_WEEKLY_COLUMN_WIDTH * 1.2,
                }}
                vertical
              >
                {restItems.map(item => (
                  <DailyCard
                    groupCount={restItems.length}
                    item={item}
                    key={item.id}
                    mode="in-popover"
                  />
                ))}
              </Flex>
            }
            destroyTooltipOnHide
            overlayClassName="[&_.ant-popover-inner]:p-1.5"
            placement="rightTop"
          >
            <Flex
              align="center"
              className="aspect-square w-full rounded-sm bg-primaryLight px-1 py-0.5 shadow-card"
              justify="center"
            >
              <Text>+{restItems.length}</Text>
            </Flex>
          </Popover>
        </Flex>
      ) : null}
    </>
  );
}

export default DailyGroupCell;
