import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeeklyCalendarContext } from '@/app/features/component/calendar/context';
import {
  getTimeInMinutes,
  useGetCurrentTime,
} from '@/app/features/component/calendar/lib';
import {
  DayOfWeek,
  WEEKLY_Z_INDEX,
} from '@/app/features/component/calendar/model';
import { cn } from '@/lib/tailwind';

const { Text } = Typography;

interface Props {
  dayOfWeek?: DayOfWeek;
  isTimeRange?: boolean;
}

function WeeklyTrackLine({ dayOfWeek, isTimeRange }: Props) {
  const { i18n } = useTranslation();
  const currentTime = useGetCurrentTime();
  const {
    baseDate,
    endHour,
    hourCellHeight,
    startHour,
    timeFormat,
    trackLine,
  } = useWeeklyCalendarContext();

  const isCurrentDay = dayOfWeek === currentTime?.day();

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

  const shouldBoldTrackLine = useMemo(() => {
    if (dayOfWeek === undefined) {
      return false;
    }

    if (isCurrentDay) {
      return true;
    }

    if (i18n.language === 'vi') {
      if (currentTime?.day() === DayOfWeek.Sunday) {
        return false;
      }

      return dayOfWeek > currentTime?.day() || dayOfWeek === DayOfWeek.Sunday;
    }

    return dayOfWeek > currentTime?.day();
  }, [currentTime, dayOfWeek, i18n.language, isCurrentDay]);

  const isCurrentWeek = dayjs(baseDate).isSame(currentTime, 'week');

  if (!trackLine || !isCurrentWeek) {
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
      className="absolute -left-[1px] -right-[1px]"
      style={{
        top: shouldBoldTrackLine
          ? trackLinePositionTop - 1
          : trackLinePositionTop,
        zIndex: WEEKLY_Z_INDEX.trackLine,
      }}
    >
      <div
        className={cn(
          'w-full border-0 border-solid',
          shouldBoldTrackLine ? 'border-b-[3px]' : 'border-b',
        )}
        style={{
          borderColor: trackLine.color,
        }}
      />

      {isCurrentDay ? (
        <div
          className="absolute -left-[5px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
          style={{
            backgroundColor: trackLine.color,
          }}
        />
      ) : null}
    </Flex>
  );
}

export default WeeklyTrackLine;
