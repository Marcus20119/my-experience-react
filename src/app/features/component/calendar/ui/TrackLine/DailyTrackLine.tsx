import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { useDailyCalendarContext } from '@/app/features/component/calendar/context';
import {
  getTimeInMinutes,
  useGetCurrentTime,
} from '@/app/features/component/calendar/lib';
import { DAILY_Z_INDEX } from '@/app/features/component/calendar/model';

const { Text } = Typography;

interface Props {
  isTimeRange?: boolean;
}

function DailyTrackLine({ isTimeRange }: Props) {
  const currentTime = useGetCurrentTime();
  const {
    baseDate,
    endHour,
    hourCellHeight,
    startHour,
    timeFormat,
    trackLine,
  } = useDailyCalendarContext();

  const startHourInMinutes = useMemo(() => startHour * 60, [startHour]);
  const endHourInMinutes = useMemo(() => endHour * 60, [endHour]);
  const currentTimeInMinutes = useMemo(
    () => getTimeInMinutes(currentTime),
    [currentTime],
  );

  const trackLinePositionTop = useMemo(
    () => (hourCellHeight * (currentTimeInMinutes - startHourInMinutes)) / 60,
    [currentTimeInMinutes, hourCellHeight, startHourInMinutes],
  );

  const isCurrentDay = dayjs(baseDate).isSame(dayjs(), 'day');

  if (!trackLine || !isCurrentDay) {
    return null;
  }

  if (
    currentTimeInMinutes < startHourInMinutes ||
    currentTimeInMinutes > endHourInMinutes
  ) {
    return null;
  }

  if (isTimeRange) {
    return (
      <Flex
        className="absolute right-2 -translate-y-1/2"
        style={{
          top: trackLinePositionTop,
        }}
      >
        <Text
          className="text-sm font-bold"
          style={{
            color: trackLine.color,
          }}
        >
          {dayjs(currentTime).format(timeFormat)}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      className="absolute -left-[1px] right-0"
      style={{
        top: trackLinePositionTop,
        zIndex: DAILY_Z_INDEX.trackLine,
      }}
    >
      <div
        className="w-full border-0 border-b-2 border-solid"
        style={{
          borderColor: trackLine.color,
        }}
      />
    </Flex>
  );
}

export default DailyTrackLine;
