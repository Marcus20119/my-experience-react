import { Flex } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';

import { useMonthlyCalendarContext } from '@/app/features/component/calendar/context';
import type { MonthlyCalendarEntity } from '@/app/features/component/calendar/model';
import { cn } from '@/lib/tailwind';

import MonthlyGroupCell from './MonthlyGroupCell';

interface Props<T extends MonthlyCalendarEntity> {
  day: Dayjs;
  items: T[];
}

function MonthlyWrapperCell<T extends MonthlyCalendarEntity>({
  day,
  items,
}: Props<T>) {
  const { baseDate, dayCellHeight, disabledCell } = useMonthlyCalendarContext();

  const isCurrentDay =
    dayjs().startOf('day').toISOString() === day.startOf('day').toISOString();
  const isCurrentMonth =
    dayjs(baseDate).startOf('month').toISOString() ===
    day.startOf('month').toISOString();

  const checkIsDisabled = useCallback(
    (startTime: Dayjs) => {
      const dayOfWeek = startTime.day();
      const endTime = startTime.clone().add(30, 'minute');

      let isDisabled = false;

      disabledCell?.forEach?.(disableGroup => {
        if (disableGroup.type === 'rangeTime') {
          const disableStartTime = disableGroup.startTime;
          const disableEndTime = disableGroup.endTime;

          if (
            startTime.isBetween(
              disableStartTime,
              disableEndTime,
              'minute',
              '[)',
            ) ||
            endTime.isBetween(disableStartTime, disableEndTime, 'minute', '(]')
          ) {
            isDisabled = true;
            return;
          }
        }

        if (disableGroup.type === 'dayOfWeek') {
          if (dayOfWeek === disableGroup.dayOfWeek) {
            isDisabled = true;
            return;
          }
        }
      });

      return isDisabled;
    },
    [disabledCell],
  );

  const isDisabled = useMemo(
    () => checkIsDisabled(day),
    [checkIsDisabled, day],
  );

  return (
    <Flex
      className={cn(
        'group px-[1px] pb-[1px] pt-0.5',
        isCurrentMonth ? 'bg-neutral-0' : 'bg-neutral-50 opacity-50',
      )}
      style={{
        backgroundImage: isDisabled
          ? 'repeating-linear-gradient(135deg, var(--neutral-300-color) 0, var(--neutral-300-color) 1px, transparent 0, transparent 50%)'
          : undefined,
        backgroundSize: isDisabled ? '12px 12px' : undefined,
        height: dayCellHeight,
      }}
    >
      <Flex className="w-full" vertical>
        <Flex align="center" className="p-2" justify="end">
          <Flex
            align="center"
            className={cn(
              'h-8 w-8 flex-shrink-0 text-center text-lg font-semibold leading-8',
              isCurrentDay && 'rounded-full bg-primary text-secondary',
            )}
            justify="center"
          >
            {day.format('DD')}
          </Flex>
        </Flex>

        <MonthlyGroupCell
          disabled={isDisabled}
          group={{
            items,
            startTime: day.startOf('day'),
          }}
        />
      </Flex>
    </Flex>
  );
}

export default MonthlyWrapperCell;
