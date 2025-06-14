import dayjs from 'dayjs';
import { describe, expect, it, test } from 'vitest';

import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DAY_MONTH_FORMAT,
} from '@/shared/constants';

import { DateTimeTool } from '../dateTime';

const { formatDate, formatDateRange } = DateTimeTool;

describe('DateTimeTool', () => {
  describe('formatDate', () => {
    test.each([
      [dayjs('2024-10-26')],
      ['2024-10-26'],
      ['2024-10-25T17:00:00.000Z'],
      [null],
      [undefined],
    ])('formatDate(%j)', date => {
      if (date) {
        expect(formatDate(date)).toBe(dayjs(date).format(DEFAULT_DATE_FORMAT));
      } else {
        expect(formatDate(date)).toBe('');
      }
    });
  });

  describe('formatDateRange', () => {
    it.each([
      [null, null],
      [undefined, undefined],
      [null, undefined],
      [undefined, null],
      [null, '2024-10-26'],
      ['2024-10-26', null],
      [undefined, '2024-10-26'],
      ['2024-10-26', undefined],
    ])(
      'should return an empty string when either start or end date is missing',
      (startDate, endDate) => {
        expect(formatDateRange(startDate, endDate)).toBe('');
      },
    );

    it.each([
      [dayjs('2024-10-26')],
      ['2024-10-26'],
      ['2024-10-25T17:00:00.000Z'],
    ])('should return a single date when start and end are the same', date => {
      const formattedRange = formatDateRange(date, date);
      expect(formattedRange).toBe(dayjs(date).format(DEFAULT_DATE_FORMAT));
    });

    it('should return a formatted range for dates in the same year', () => {
      const startDate = dayjs('2024-10-01');
      const endDate = dayjs('2024-10-26');
      const formattedRange = formatDateRange(startDate, endDate);
      expect(formattedRange).toBe(
        `${startDate.format(DEFAULT_DAY_MONTH_FORMAT)} - ${endDate.format(DEFAULT_DATE_FORMAT)}`,
      );
    });

    it('should return a formatted range for dates in different years', () => {
      const startDate = dayjs('2023-10-01');
      const endDate = dayjs('2024-10-26');
      const formattedRange = formatDateRange(startDate, endDate);
      expect(formattedRange).toBe(
        `${startDate.format(DEFAULT_DATE_FORMAT)} - ${endDate.format(DEFAULT_DATE_FORMAT)}`,
      );
    });
  });
});
