import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import { useDailyCalendarContext } from '@/app/features/component/calendar/context';
import { useGetCurrentTime } from '@/app/features/component/calendar/lib';
import { cn } from '@/lib/tailwind';

import { DailyTrackLine } from '../TrackLine';

const { Text } = Typography;

function DailyTimeRangeCell() {
  const currentTime = useGetCurrentTime();
  const { baseDate, endHour, hourCellHeight, startHour, timeFormat } =
    useDailyCalendarContext();

  const renderTimeFormat = timeFormat === 'H:mm A' ? 'h A' : timeFormat;
  const isCurrentDay = dayjs(baseDate).isSame(currentTime, 'week');

  return (
    <Flex className="relative" id="time-range" vertical>
      {Array(endHour - startHour + 1)
        .fill(0)
        .map((_, index) => {
          const hourTime = dayjs()
            .startOf('date')
            .add(startHour + index, 'hour');

          const shouldHideHourTime = isCurrentDay
            ? Math.abs(currentTime.diff(hourTime, 'minute')) < 15
            : false;

          return (
            <Flex
              className="pr-2"
              justify="end"
              key={index}
              style={{
                height: hourCellHeight,
              }}
            >
              <Text
                className={cn(
                  'text-sm',
                  index === 0 || shouldHideHourTime
                    ? 'hidden'
                    : '-translate-y-3',
                )}
              >
                {dayjs()
                  .startOf('date')
                  .add(startHour + index, 'hour')
                  .format(renderTimeFormat)}
              </Text>
            </Flex>
          );
        })}

      <DailyTrackLine isTimeRange />
    </Flex>
  );
}

export default DailyTimeRangeCell;
