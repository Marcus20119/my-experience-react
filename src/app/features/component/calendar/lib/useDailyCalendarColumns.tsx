import type { ColumnType } from 'antd/es/table';
import { useMemo } from 'react';

import type { DailyCalendarEntity, DailyRow } from '../model';
import { DailyTimeRangeCell, DailyTitleCell, DailyWrapperCell } from '../ui';

export const useDailyCalendarColumns = <T extends DailyCalendarEntity>() => {
  const columns: ColumnType<DailyRow<T>>[] = useMemo(() => {
    const columns: ColumnType<DailyRow<T>>[] = [
      {
        dataIndex: 'timeRange',
        fixed: 'left',
        key: 'timeRange',
        render: () => <DailyTimeRangeCell />,
        width: 80,
      },
      {
        dataIndex: 'monday',
        key: 'monday',
        render: (_, { data }) => <DailyWrapperCell<T> items={data} />,
        title: <DailyTitleCell />,
      },
    ];

    return columns;
  }, []);

  return columns;
};
