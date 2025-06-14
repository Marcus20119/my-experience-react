import { Flex } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeeklyCalendarContext } from '@/app/features/component/calendar/context';
import type {
  WeeklyCalendarEntity,
  WeeklyGroup,
} from '@/app/features/component/calendar/model';
import { DayOfWeek } from '@/app/features/component/calendar/model';

import { WeeklyTrackLine } from '../TrackLine';
import WeeklyGridCell from './WeeklyGridCell';
import WeeklyGroupCell from './WeeklyGroupCell';

interface Props<T extends WeeklyCalendarEntity> {
  dayOfWeek: DayOfWeek;
  items: T[];
}

function WeeklyWrapperCell<T extends WeeklyCalendarEntity>({
  dayOfWeek,
  items,
}: Props<T>) {
  const { i18n } = useTranslation();
  const { baseDate } = useWeeklyCalendarContext();

  const date = useMemo(() => {
    if (i18n.language === 'vi' && dayOfWeek === DayOfWeek.Sunday) {
      return dayjs(baseDate).day(dayOfWeek).add(1, 'week').startOf('day');
    }

    return dayjs(baseDate).day(dayOfWeek).startOf('day');
  }, [baseDate, dayOfWeek, i18n.language]);

  const itemGroups: WeeklyGroup<T>[] = useMemo(() => {
    const itemGroups: WeeklyGroup<T>[] = [];

    items.forEach(item => {
      const { startTime } = item;

      const group = itemGroups.find(
        itemGroup =>
          dayjs(itemGroup.startTime).toISOString() ===
          dayjs(startTime).toISOString(),
      );

      if (group) {
        group.items.push(item);
      } else {
        itemGroups.push({
          items: [item],
          startTime,
        });
      }
    });

    return itemGroups;
  }, [items]);

  return (
    <Flex className="relative" vertical>
      <WeeklyGridCell date={date} />

      {itemGroups.map((group, order) => (
        <WeeklyGroupCell
          group={group}
          key={dayjs(group.startTime).toISOString()}
          order={order}
        />
      ))}

      <WeeklyTrackLine dayOfWeek={dayOfWeek} />
    </Flex>
  );
}

export default WeeklyWrapperCell;
