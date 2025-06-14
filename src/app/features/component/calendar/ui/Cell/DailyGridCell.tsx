import { Divider, Flex } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { useDailyCalendarContext } from '@/app/features/component/calendar/context';
import type { Hour } from '@/app/features/component/calendar/model';
import { cn } from '@/lib/tailwind';

import DailyCreateNewItemCell from './DailyCreateNewItemCell';
import DisabledCell from './DisabledCell';

function DailyGridCell() {
  const { baseDate, disabledCell, endHour, hourCellHeight, startHour } =
    useDailyCalendarContext();

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
            dayjs(baseDate)
              .hour(startHour + index)
              .minute(0)
              .second(0)
              .millisecond(0),
          );

          const isSecondHalfDisabled = checkIsDisabled(
            dayjs(baseDate)
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
                  <DailyCreateNewItemCell
                    disabled={isFirstHalfDisabled}
                    startTime={dayjs(baseDate)
                      .hour(startHour + index)
                      .minute(0)
                      .second(0)
                      .millisecond(0)}
                  />
                  <Divider className="m-0 border-dashed border-neutral-200" />
                  <DailyCreateNewItemCell
                    disabled={isSecondHalfDisabled}
                    startTime={dayjs(baseDate)
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

export default DailyGridCell;
