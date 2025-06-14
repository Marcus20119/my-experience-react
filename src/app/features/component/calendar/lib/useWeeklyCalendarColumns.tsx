import type { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { WeeklyCalendarEntity, WeeklyRow } from '../model';
import { DayOfWeek, DEFAULT_WEEKLY_COLUMN_WIDTH } from '../model';
import { WeeklyTimeRangeCell, WeeklyTitleCell, WeeklyWrapperCell } from '../ui';

export const useWeeklyCalendarColumns = <T extends WeeklyCalendarEntity>() => {
  const { i18n } = useTranslation();

  const columns: ColumnType<WeeklyRow<T>>[] = useMemo(() => {
    const columns: ColumnType<WeeklyRow<T>>[] = [
      {
        dataIndex: 'timeRange',
        fixed: 'left',
        key: 'timeRange',
        render: () => <WeeklyTimeRangeCell />,
        width: 80,
      },
      {
        dataIndex: 'monday',
        key: 'monday',
        render: (_, { monday }) => (
          <WeeklyWrapperCell<T> dayOfWeek={DayOfWeek.Monday} items={monday} />
        ),
        title: <WeeklyTitleCell dayOfWeek={DayOfWeek.Monday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'tuesday',
        key: 'tuesday',
        render: (_, { tuesday }) => (
          <WeeklyWrapperCell<T> dayOfWeek={DayOfWeek.Tuesday} items={tuesday} />
        ),
        title: <WeeklyTitleCell dayOfWeek={DayOfWeek.Tuesday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'wednesday',
        key: 'wednesday',
        render: (_, { wednesday }) => (
          <WeeklyWrapperCell<T>
            dayOfWeek={DayOfWeek.Wednesday}
            items={wednesday}
          />
        ),
        title: <WeeklyTitleCell dayOfWeek={DayOfWeek.Wednesday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'thursday',
        key: 'thursday',
        render: (_, { thursday }) => (
          <WeeklyWrapperCell<T>
            dayOfWeek={DayOfWeek.Thursday}
            items={thursday}
          />
        ),
        title: <WeeklyTitleCell dayOfWeek={DayOfWeek.Thursday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'friday',
        key: 'friday',
        render: (_, { friday }) => (
          <WeeklyWrapperCell<T> dayOfWeek={DayOfWeek.Friday} items={friday} />
        ),
        title: <WeeklyTitleCell dayOfWeek={DayOfWeek.Friday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'saturday',
        key: 'saturday',
        render: (_, { saturday }) => (
          <WeeklyWrapperCell<T>
            dayOfWeek={DayOfWeek.Saturday}
            items={saturday}
          />
        ),
        title: <WeeklyTitleCell dayOfWeek={DayOfWeek.Saturday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'sunday',
        key: 'sunday',
        render: (_, { sunday }) => (
          <WeeklyWrapperCell<T> dayOfWeek={DayOfWeek.Sunday} items={sunday} />
        ),
        title: <WeeklyTitleCell dayOfWeek={DayOfWeek.Sunday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
    ];

    return columns;
  }, []);

  const sortedColumns: ColumnType<WeeklyRow<T>>[] = useMemo(() => {
    if (i18n.language === 'vi') {
      return columns;
    }

    const sundayCol = columns.pop() as ColumnType<WeeklyRow<T>>;
    const timeRangeCol = columns.shift() as ColumnType<WeeklyRow<T>>;

    return [timeRangeCol, sundayCol, ...columns];
  }, [columns, i18n.language]);

  return sortedColumns;
};
