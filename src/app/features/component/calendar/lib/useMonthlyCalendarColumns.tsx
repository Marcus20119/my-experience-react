import type { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { MonthlyCalendarEntity, MonthlyRow } from '../model';
import { DayOfWeek, DEFAULT_WEEKLY_COLUMN_WIDTH } from '../model';
import { MonthlyTitleCell, MonthlyWrapperCell } from '../ui';

export const useMonthlyCalendarColumns = <
  T extends MonthlyCalendarEntity,
>() => {
  const { i18n } = useTranslation();

  const columns: ColumnType<MonthlyRow<T>>[] = useMemo(() => {
    const columns: ColumnType<MonthlyRow<T>>[] = [
      {
        dataIndex: 'monday',
        key: 'monday',
        render: (_, { monday }) => (
          <MonthlyWrapperCell<T> day={monday.day} items={monday.items} />
        ),
        title: <MonthlyTitleCell dayOfWeek={DayOfWeek.Monday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'tuesday',
        key: 'tuesday',
        render: (_, { tuesday }) => (
          <MonthlyWrapperCell<T> day={tuesday.day} items={tuesday.items} />
        ),
        title: <MonthlyTitleCell dayOfWeek={DayOfWeek.Tuesday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'wednesday',
        key: 'wednesday',
        render: (_, { wednesday }) => (
          <MonthlyWrapperCell<T> day={wednesday.day} items={wednesday.items} />
        ),
        title: <MonthlyTitleCell dayOfWeek={DayOfWeek.Wednesday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'thursday',
        key: 'thursday',
        render: (_, { thursday }) => (
          <MonthlyWrapperCell<T> day={thursday.day} items={thursday.items} />
        ),
        title: <MonthlyTitleCell dayOfWeek={DayOfWeek.Thursday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'friday',
        key: 'friday',
        render: (_, { friday }) => (
          <MonthlyWrapperCell<T> day={friday.day} items={friday.items} />
        ),
        title: <MonthlyTitleCell dayOfWeek={DayOfWeek.Friday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'saturday',
        key: 'saturday',
        render: (_, { saturday }) => (
          <MonthlyWrapperCell<T> day={saturday.day} items={saturday.items} />
        ),
        title: <MonthlyTitleCell dayOfWeek={DayOfWeek.Saturday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
      {
        dataIndex: 'sunday',
        key: 'sunday',
        render: (_, { sunday }) => (
          <MonthlyWrapperCell<T> day={sunday.day} items={sunday.items} />
        ),
        title: <MonthlyTitleCell dayOfWeek={DayOfWeek.Sunday} />,
        width: DEFAULT_WEEKLY_COLUMN_WIDTH,
      },
    ];

    return columns;
  }, []);

  const sortedColumns: ColumnType<MonthlyRow<T>>[] = useMemo(() => {
    if (i18n.language === 'vi') {
      return columns;
    }

    const sundayCol = columns.pop() as ColumnType<MonthlyRow<T>>;

    return [sundayCol, ...columns];
  }, [columns, i18n.language]);

  return sortedColumns;
};
