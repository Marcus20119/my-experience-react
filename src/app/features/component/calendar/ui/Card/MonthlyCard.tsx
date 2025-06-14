import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import { useMonthlyCalendarContext } from '@/app/features/component/calendar/context';
import type { MonthlyCalendarEntity } from '@/app/features/component/calendar/model';
import { cn } from '@/lib/tailwind';

const { Text } = Typography;

interface MonthlyCardProps<T extends MonthlyCalendarEntity> {
  groupCount: number;
  item: T;
  mode: 'in-calendar' | 'in-popover';
}

function MonthlyCard<T extends MonthlyCalendarEntity>({
  groupCount,
  item,
  mode,
}: MonthlyCardProps<T>) {
  const { itemRender, onClickItem } = useMonthlyCalendarContext();
  const { endTime } = item;

  const passedItem = dayjs().isAfter(dayjs(endTime).endOf('day'));

  return (
    <Flex
      className={cn(
        'relative h-fit px-[1px] py-0.5',
        onClickItem ? 'cursor-pointer' : '',
      )}
      onClick={() => onClickItem?.(item)}
    >
      {itemRender ? (
        <div className="h-full w-full bg-neutral-0">
          <div
            className={cn(
              'h-full w-full',
              passedItem && mode === 'in-calendar' ? 'opacity-70' : '',
            )}
          >
            {itemRender(item, { groupCount, mode })}
          </div>
        </div>
      ) : (
        <Flex
          className="h-full w-full rounded-sm bg-primaryLight px-1 py-0.5 shadow-card"
          vertical
        >
          <Text>{dayjs(item.startTime).format('H:mm')}</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default MonthlyCard;
