import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT } from '@/shared/constants';

interface Props {
  endTime?: Dayjs | string;
  startTime?: Dayjs | string;
  timeFormat?: string;
}

export const formatRangeDate = ({
  endTime,
  startTime,
  timeFormat = DEFAULT_TIME_FORMAT,
}: Props) => {
  if (!startTime || !endTime) {
    return '';
  }

  const isSameDate = dayjs(startTime).isSame(dayjs(endTime), 'date');

  if (isSameDate) {
    return `${dayjs(startTime).format(timeFormat)} - ${dayjs(endTime).format(timeFormat)}, ${dayjs(endTime).format(DEFAULT_DATE_FORMAT)}`;
  }

  const fullTimeFormat = `${timeFormat}, ${DEFAULT_DATE_FORMAT}`;

  return `${dayjs(startTime).format(fullTimeFormat)} - ${dayjs(endTime).format(fullTimeFormat)}`;
};
