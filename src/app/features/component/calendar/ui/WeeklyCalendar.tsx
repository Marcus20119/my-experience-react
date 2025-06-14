import { Table } from 'antd';
import type { TableProps } from 'antd/lib';
import dayjs from 'dayjs';

import { COLOR } from '@/shared/assets/styles/constants';

import type { WeeklyContextProps } from '../context';
import { WeeklyCalendarProvider } from '../context';
import { useGetWeeklyCalendarData, useWeeklyCalendarColumns } from '../lib';
import type { WeeklyCalendarEntity, WeeklyRow } from '../model';
import {
  DEFAULT_WEEKLY_CALENDAR_END_TIME,
  DEFAULT_WEEKLY_CALENDAR_START_TIME,
  DEFAULT_WEEKLY_HOUR_CELL_HEIGHT,
} from '../model';
import { WeeklyCalendarStyled } from './styles';

interface WeeklyTableProps<T> extends Pick<TableProps, 'loading' | 'scroll'> {
  dataSource?: T[];
}

function WeeklyTable<T extends WeeklyCalendarEntity>({
  dataSource,
  ...props
}: WeeklyTableProps<T>) {
  const { calendarData } = useGetWeeklyCalendarData<T>({
    dataSource,
  });
  const columns = useWeeklyCalendarColumns<T>();

  return (
    <WeeklyCalendarStyled>
      <Table<WeeklyRow<T>>
        bordered
        columns={columns}
        dataSource={calendarData}
        pagination={false}
        {...props}
      />
    </WeeklyCalendarStyled>
  );
}

interface WeeklyCalendarProps<T extends WeeklyCalendarEntity>
  extends WeeklyTableProps<T>,
    Partial<WeeklyContextProps<T>> {}

function WeeklyCalendar<T extends WeeklyCalendarEntity>({
  baseDate = dayjs(),
  dataSource,
  disabledCell,
  endHour = DEFAULT_WEEKLY_CALENDAR_END_TIME,
  hourCellHeight = DEFAULT_WEEKLY_HOUR_CELL_HEIGHT,
  itemRender,
  loading,
  maxItemShowPerGroup = 3,
  onClickHeader,
  onClickItem,
  onCreateNewItem,
  scroll,
  startHour = DEFAULT_WEEKLY_CALENDAR_START_TIME,
  timeFormat = 'H:mm',
  trackLine = {
    color: COLOR.primary,
  },
}: WeeklyCalendarProps<T>) {
  return (
    <WeeklyCalendarProvider<T>
      baseDate={baseDate}
      disabledCell={disabledCell}
      endHour={endHour}
      hourCellHeight={hourCellHeight}
      itemRender={itemRender}
      maxItemShowPerGroup={maxItemShowPerGroup}
      onClickHeader={onClickHeader}
      onClickItem={onClickItem}
      onCreateNewItem={onCreateNewItem}
      startHour={startHour}
      timeFormat={timeFormat}
      trackLine={trackLine}
    >
      <WeeklyTable dataSource={dataSource} loading={loading} scroll={scroll} />
    </WeeklyCalendarProvider>
  );
}

export default WeeklyCalendar;
