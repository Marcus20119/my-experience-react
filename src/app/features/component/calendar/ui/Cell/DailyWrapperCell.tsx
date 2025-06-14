import { Flex } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import type {
  DailyCalendarEntity,
  DailyGroup,
} from '@/app/features/component/calendar/model';

import { DailyTrackLine } from '../TrackLine';
import DailyGridCell from './DailyGridCell';
import DailyGroupCell from './DailyGroupCell';

interface Props<T extends DailyCalendarEntity> {
  items: T[];
}

function DailyWrapperCell<T extends DailyCalendarEntity>({ items }: Props<T>) {
  const itemGroups: DailyGroup<T>[] = useMemo(() => {
    const itemGroups: DailyGroup<T>[] = [];

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
      <DailyGridCell />

      {itemGroups.map((group, order) => (
        <DailyGroupCell
          group={group}
          key={dayjs(group.startTime).toISOString()}
          order={order}
        />
      ))}

      <DailyTrackLine />
    </Flex>
  );
}

export default DailyWrapperCell;
