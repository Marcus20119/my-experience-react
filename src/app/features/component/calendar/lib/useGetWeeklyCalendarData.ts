/* eslint-disable perfectionist/sort-objects */
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { DayOfWeek, type WeeklyCalendarEntity, type WeeklyRow } from '../model';
import { getTimeInMinutes } from './getTimeInMinutes';

interface Props<T extends WeeklyCalendarEntity> {
  dataSource?: T[];
}

export const useGetWeeklyCalendarData = <T extends WeeklyCalendarEntity>({
  dataSource,
}: Props<T>) => {
  const calendarData: WeeklyRow<T>[] = useMemo(() => {
    const formattedDataSource: T[] =
      dataSource
        ?.map(item => ({
          ...item,
          endTime: dayjs(item.endTime).second(0).millisecond(0),
          startTime: dayjs(item.startTime).second(0).millisecond(0),
        }))
        ?.sort((a, b) => {
          const aRangeTime =
            getTimeInMinutes(a.startTime) - getTimeInMinutes(a.endTime);
          const bRangeTime =
            getTimeInMinutes(b.startTime) - getTimeInMinutes(b.endTime);

          return aRangeTime - bRangeTime;
        }) ?? [];

    const daysOfWeekMap: Record<number, keyof WeeklyRow<T>> = {
      [DayOfWeek.Monday]: 'monday',
      [DayOfWeek.Tuesday]: 'tuesday',
      [DayOfWeek.Wednesday]: 'wednesday',
      [DayOfWeek.Thursday]: 'thursday',
      [DayOfWeek.Friday]: 'friday',
      [DayOfWeek.Saturday]: 'saturday',
      [DayOfWeek.Sunday]: 'sunday',
    };

    const weekData: WeeklyRow<T> = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };

    formattedDataSource.forEach(item => {
      const day = dayjs(item.startTime).day();
      const dayKey = daysOfWeekMap[day];

      if (dayKey) {
        weekData[dayKey].push(item);
      }
    });

    return [weekData];
  }, [dataSource]);

  return { calendarData };
};
