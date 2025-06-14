import { Table } from 'antd';
import type { TableProps } from 'antd/lib';
import dayjs from 'dayjs';

import { COLOR } from '@/shared/assets/styles/constants';

import type { DailyContextProps } from '../context';
import { DailyCalendarProvider } from '../context';
import { useDailyCalendarColumns, useGetDailyCalendarData } from '../lib';
import type { DailyCalendarEntity, DailyRow } from '../model';
import {
  DEFAULT_DAILY_CALENDAR_END_TIME,
  DEFAULT_DAILY_CALENDAR_START_TIME,
  DEFAULT_DAILY_HOUR_CELL_HEIGHT,
} from '../model';
import { DailyCalendarStyled } from './styles';

interface DailyTableProps<T> extends Pick<TableProps, 'loading' | 'scroll'> {
  dataSource?: T[];
}

function DailyTable<T extends DailyCalendarEntity>({
  dataSource,
  ...props
}: DailyTableProps<T>) {
  const { calendarData } = useGetDailyCalendarData<T>({
    dataSource,
  });
  const columns = useDailyCalendarColumns<T>();

  return (
    <DailyCalendarStyled>
      <Table<DailyRow<T>>
        bordered
        columns={columns}
        dataSource={calendarData}
        pagination={false}
        {...props}
      />
    </DailyCalendarStyled>
  );
}

interface DailyCalendarProps<T extends DailyCalendarEntity>
  extends DailyTableProps<T>,
    Partial<DailyContextProps<T>> {}

function DailyCalendar<T extends DailyCalendarEntity>({
  baseDate = dayjs(),
  dataSource,
  disabledCell,
  endHour = DEFAULT_DAILY_CALENDAR_END_TIME,
  hourCellHeight = DEFAULT_DAILY_HOUR_CELL_HEIGHT,
  itemRender,
  loading,
  maxItemShowPerGroup = 3,
  onClickItem,
  onCreateNewItem,
  scroll,
  startHour = DEFAULT_DAILY_CALENDAR_START_TIME,
  timeFormat = 'H:mm',
  trackLine = {
    color: COLOR.primary,
  },
}: DailyCalendarProps<T>) {
  return (
    <DailyCalendarProvider<T>
      baseDate={baseDate}
      disabledCell={disabledCell}
      endHour={endHour}
      hourCellHeight={hourCellHeight}
      itemRender={itemRender}
      maxItemShowPerGroup={maxItemShowPerGroup}
      onClickItem={onClickItem}
      onCreateNewItem={onCreateNewItem}
      startHour={startHour}
      timeFormat={timeFormat}
      trackLine={trackLine}
    >
      <DailyTable dataSource={dataSource} loading={loading} scroll={scroll} />
    </DailyCalendarProvider>
  );
}

export default DailyCalendar;
