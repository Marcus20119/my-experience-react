import dayjs from 'dayjs';
import { useMemo } from 'react';

import { type DailyCalendarEntity, type DailyRow } from '../model';
import { getTimeInMinutes } from './getTimeInMinutes';

interface Props<T extends DailyCalendarEntity> {
  dataSource?: T[];
}

export const useGetDailyCalendarData = <T extends DailyCalendarEntity>({
  dataSource,
}: Props<T>) => {
  const calendarData: DailyRow<T>[] = useMemo(() => {
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

    return [{ data: formattedDataSource }];
  }, [dataSource]);

  return { calendarData };
};
