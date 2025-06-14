import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { DEFAULT_DATE_FORMAT, DEFAULT_DAY_MONTH_FORMAT } from '../constants';

const formatDate = (date?: Dayjs | null | string) =>
  date ? dayjs(date).format(DEFAULT_DATE_FORMAT) : '';

const formatDateRange = (
  startDate?: Dayjs | null | string,
  endDate?: Dayjs | null | string,
) => {
  if (!startDate || !endDate) {
    return '';
  }

  const start = dayjs(startDate).format(DEFAULT_DATE_FORMAT);
  const end = dayjs(endDate).format(DEFAULT_DATE_FORMAT);

  const isSameDate = start === end;

  if (isSameDate) {
    return start;
  }

  const isSameYear = dayjs(startDate).isSame(dayjs(endDate), 'year');

  if (isSameYear) {
    const shortedStart = dayjs(startDate).format(DEFAULT_DAY_MONTH_FORMAT);

    return `${shortedStart} - ${end}`;
  }

  return `${start} - ${end}`;
};

export const DateTimeTool = {
  formatDate,
  formatDateRange,
};
