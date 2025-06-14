/* eslint-disable perfectionist/sort-objects */
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { useLocalStore } from '@/shared/stores';

import { useMonthlyCalendarContext } from '../context';
import type { MonthlyCalendarEntity, MonthlyRow } from '../model';
import { DayOfWeek } from '../model';
import { getTimeInMinutes } from './getTimeInMinutes';
import { useGetMonthlyRangeDay } from './useGetMonthlyRangeDay';

interface Props<T extends MonthlyCalendarEntity> {
  dataSource?: T[];
}

export const useGetMonthlyCalendarData = <T extends MonthlyCalendarEntity>({
  dataSource,
}: Props<T>) => {
  const { baseDate } = useMonthlyCalendarContext();
  const { language } = useLocalStore();

  const { endDay, startDay } = useGetMonthlyRangeDay({ baseDate });

  const calendarData: MonthlyRow<T>[] = useMemo(() => {
    const numberOfDays = endDay.diff(startDay, 'day') + 1;
    const numberOfWeeks = Math.ceil(numberOfDays / 7);

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

    const monthData: T[][] = Array.from({ length: numberOfDays }).map(() => []);

    formattedDataSource?.forEach(item => {
      if (
        dayjs(item.endTime).isBefore(startDay) ||
        dayjs(item.startTime).isAfter(endDay)
      ) {
        return;
      }

      const order = dayjs(item.startTime).isBefore(startDay)
        ? 0
        : dayjs(item.startTime).diff(startDay, 'day');
      const range = dayjs(item.startTime).isBefore(startDay)
        ? dayjs(item.endTime).diff(startDay, 'day')
        : dayjs(item.endTime).diff(item.startTime, 'day');

      for (let i = 0; i <= range; i++) {
        if (!monthData[order + i]) {
          continue;
        }

        monthData[order + i].push(item);
      }
    });

    const formattedMonthData: MonthlyRow<T>[] = Array.from({
      length: numberOfWeeks,
    }).map(() => ({
      monday: {
        day: dayjs(),
        items: [],
      },
      tuesday: {
        day: dayjs(),
        items: [],
      },
      wednesday: {
        day: dayjs(),
        items: [],
      },
      thursday: {
        day: dayjs(),
        items: [],
      },
      friday: {
        day: dayjs(),
        items: [],
      },
      saturday: {
        day: dayjs(),
        items: [],
      },
      sunday: {
        day: dayjs(),
        items: [],
      },
    }));

    const daysOfWeekMap: Record<number, keyof MonthlyRow<T>> = {
      [DayOfWeek.Monday]: 'monday',
      [DayOfWeek.Tuesday]: 'tuesday',
      [DayOfWeek.Wednesday]: 'wednesday',
      [DayOfWeek.Thursday]: 'thursday',
      [DayOfWeek.Friday]: 'friday',
      [DayOfWeek.Saturday]: 'saturday',
      [DayOfWeek.Sunday]: 'sunday',
    };

    monthData.forEach((items, index) => {
      const day = dayjs(startDay).add(index, 'day').day();
      const dayKey = daysOfWeekMap[day];

      formattedMonthData[Math.floor(index / 7)][dayKey].day = dayjs(
        startDay,
      ).add(index, 'day');

      if (dayKey) {
        formattedMonthData[Math.floor(index / 7)][dayKey].items = items;
      }
    });

    return formattedMonthData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource, endDay, startDay, language]);

  return { calendarData };
};
