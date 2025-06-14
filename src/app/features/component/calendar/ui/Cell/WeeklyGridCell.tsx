import { Divider, Flex } from 'antd';
import type { Dayjs } from 'dayjs';
import { useCallback } from 'react';

import { useWeeklyCalendarContext } from '@/app/features/component/calendar/context';
import type { Hour } from '@/app/features/component/calendar/model';
import { cn } from '@/lib/tailwind';

import DisabledCell from './DisabledCell';
import WeeklyCreateNewItemCell from './WeeklyCreateNewItemCell';

interface Props {
  date: Dayjs;
}

function WeeklyGridCell({ date }: Props) {
  const { disabledCell, endHour, hourCellHeight, startHour } =
    useWeeklyCalendarContext();

  const checkIsDisabled = useCallback(
    (startTime: Dayjs) => {
      const dayOfWeek = startTime.day();
      const endTime = startTime.clone().add(30, 'minute');
      const startHour = startTime.hour() as Hour;
      const startMinute = startTime.minute() as 0 | 30;

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
          if (dayOfWeek !== disableGroup.dayOfWeek) {
            return;
          }

          if (!disableGroup.hours && !disableGroup.minutes) {
            isDisabled = true;
            return;
          }

          if (
            !disableGroup.hours &&
            disableGroup.minutes?.(startHour)?.includes(startMinute)
          ) {
            isDisabled = true;
            return;
          }

          if (
            !disableGroup.minutes &&
            disableGroup.hours?.includes(startHour)
          ) {
            isDisabled = true;
            return;
          }

          if (
            disableGroup.hours?.includes(startHour) &&
            disableGroup.minutes?.(startHour)?.includes(startMinute)
          ) {
            isDisabled = true;
            return;
          }
        }
      });

      return isDisabled;
    },
    [disabledCell],
  );

  return (
    <Flex className="relative" vertical>
      {Array(endHour - startHour + 1)
        .fill(0)
        .map((_, index) => {
          const isFirstHalfDisabled = checkIsDisabled(
            date
              .hour(startHour + index)
              .minute(0)
              .second(0)
              .millisecond(0),
          );

          const isSecondHalfDisabled = checkIsDisabled(
            date
              .hour(startHour + index)
              .minute(30)
              .second(0)
              .millisecond(0),
          );

          return (
            <Flex
              className={cn(
                'box-border border-0 border-solid border-neutral-300',
                index !== 0 ? 'border-t' : '',
              )}
              key={index}
              style={{
                height: hourCellHeight,
              }}
              vertical
            >
              {isFirstHalfDisabled && isSecondHalfDisabled ? (
                <DisabledCell />
              ) : (
                <>
                  <WeeklyCreateNewItemCell
                    disabled={isFirstHalfDisabled}
                    startTime={date
                      .hour(startHour + index)
                      .minute(0)
                      .second(0)
                      .millisecond(0)}
                  />
                  <Divider className="m-0 border-dashed border-neutral-200" />
                  <WeeklyCreateNewItemCell
                    disabled={isSecondHalfDisabled}
                    startTime={date
                      .hour(startHour + index)
                      .minute(30)
                      .second(0)
                      .millisecond(0)}
                  />
                </>
              )}
            </Flex>
          );
        })}
    </Flex>
  );
}

export default WeeklyGridCell;
