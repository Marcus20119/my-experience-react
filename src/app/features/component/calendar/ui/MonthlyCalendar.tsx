import { Table } from 'antd';
import type { TableProps } from 'antd/lib';
import dayjs from 'dayjs';

import type { MonthlyContextProps } from '../context';
import { MonthlyCalendarProvider } from '../context';
import { useGetMonthlyCalendarData } from '../lib';
import { useMonthlyCalendarColumns } from '../lib/useMonthlyCalendarColumns';
import type { MonthlyCalendarEntity, MonthlyRow } from '../model';
import { DEFAULT_MONTHLY_DAY_CELL_HEIGHT } from '../model';
import { MonthlyCalendarStyled } from './styles';

interface MonthlyTableProps<T> extends Pick<TableProps, 'loading' | 'scroll'> {
  dataSource?: T[];
}

function MonthlyTable<T extends MonthlyCalendarEntity>({
  dataSource,
  ...props
}: MonthlyTableProps<T>) {
  const { calendarData } = useGetMonthlyCalendarData<T>({
    dataSource,
  });
  const columns = useMonthlyCalendarColumns<T>();

  return (
    <MonthlyCalendarStyled>
      <Table<MonthlyRow<T>>
        bordered
        columns={columns}
        dataSource={calendarData}
        pagination={false}
        {...props}
      />
    </MonthlyCalendarStyled>
  );
}

interface MonthlyCalendarProps<T extends MonthlyCalendarEntity>
  extends MonthlyTableProps<T>,
    Partial<MonthlyContextProps<T>> {}

function MonthlyCalendar<T extends MonthlyCalendarEntity>({
  baseDate = dayjs(),
  dataSource,
  dayCellHeight = DEFAULT_MONTHLY_DAY_CELL_HEIGHT,
  disabledCell,
  itemRender,
  loading,
  maxItemShowPerGroup = 3,
  onClickItem,
  onCreateNewItem,
  scroll,
  timeFormat = 'H:mm',
}: MonthlyCalendarProps<T>) {
  return (
    <MonthlyCalendarProvider<T>
      baseDate={baseDate}
      dayCellHeight={dayCellHeight}
      disabledCell={disabledCell}
      itemRender={itemRender}
      maxItemShowPerGroup={maxItemShowPerGroup}
      onClickItem={onClickItem}
      onCreateNewItem={onCreateNewItem}
      timeFormat={timeFormat}
    >
      <MonthlyTable dataSource={dataSource} loading={loading} scroll={scroll} />
    </MonthlyCalendarProvider>
  );
}

export default MonthlyCalendar;
