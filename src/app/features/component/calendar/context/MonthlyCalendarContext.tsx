import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { createContext, useContext } from 'react';

import type {
  MonthlyCalendarEntity,
  MonthlyDisabledCell,
} from '../model';
import { DEFAULT_DAILY_HOUR_CELL_HEIGHT } from '../model';

export interface MonthlyContextProps<
  T extends MonthlyCalendarEntity = MonthlyCalendarEntity,
> {
  baseDate: Dayjs | string;
  dayCellHeight: number;
  disabledCell?: MonthlyDisabledCell;
  itemRender?: (
    item: T,
    additionalData: {
      groupCount: number;
      mode: 'in-calendar' | 'in-popover';
    },
  ) => React.ReactNode;
  maxItemShowPerGroup: number;
  onClickItem?: (item: T) => void;
  onCreateNewItem?: (startTime: Dayjs) => void;
  timeFormat: 'H:mm A' | 'H:mm';
}

const MonthlyCalendarContext = createContext<MonthlyContextProps>({
  baseDate: dayjs(),
  dayCellHeight: DEFAULT_DAILY_HOUR_CELL_HEIGHT,
  maxItemShowPerGroup: 3,
  timeFormat: 'H:mm',
});

interface ProviderProps<T extends MonthlyCalendarEntity>
  extends MonthlyContextProps<T> {
  children: React.ReactNode;
}

export function MonthlyCalendarProvider<T extends MonthlyCalendarEntity>({
  children,
  ...props
}: ProviderProps<T>) {
  return (
    <MonthlyCalendarContext.Provider value={props as MonthlyContextProps}>
      {children}
    </MonthlyCalendarContext.Provider>
  );
}

export function useMonthlyCalendarContext() {
  const context = useContext(MonthlyCalendarContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useMonthlyCalendarContext must be used within MonthlyCalendarContext',
    );
  }

  return context;
}
