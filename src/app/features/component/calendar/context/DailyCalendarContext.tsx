import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { createContext, useContext } from 'react';

import { COLOR } from '@/shared/assets/styles/constants';

import type { DailyCalendarEntity, DailyDisabledCell, Hour } from '../model';
import {
  DEFAULT_DAILY_CALENDAR_END_TIME,
  DEFAULT_DAILY_CALENDAR_START_TIME,
  DEFAULT_DAILY_HOUR_CELL_HEIGHT,
} from '../model';

export interface DailyContextProps<
  T extends DailyCalendarEntity = DailyCalendarEntity,
> {
  baseDate: Dayjs | string;
  disabledCell?: DailyDisabledCell;
  endHour: Hour;
  hourCellHeight: number;
  itemRender?: (
    item: T,
    additionalData: {
      groupCount: number;
      height: number;
      mode: 'in-calendar' | 'in-popover';
    },
  ) => React.ReactNode;
  maxItemShowPerGroup: number;
  onClickItem?: (item: T) => void;
  onCreateNewItem?: (startTime: Dayjs) => void;
  startHour: Hour;
  timeFormat: 'H:mm A' | 'H:mm';
  trackLine:
    | {
        color?: string;
      }
    | false;
}

const DailyCalendarContext = createContext<DailyContextProps>({
  baseDate: dayjs(),
  endHour: DEFAULT_DAILY_CALENDAR_END_TIME,
  hourCellHeight: DEFAULT_DAILY_HOUR_CELL_HEIGHT,
  maxItemShowPerGroup: 3,
  startHour: DEFAULT_DAILY_CALENDAR_START_TIME,
  timeFormat: 'H:mm',
  trackLine: {
    color: COLOR.primary,
  },
});

interface ProviderProps<T extends DailyCalendarEntity>
  extends DailyContextProps<T> {
  children: React.ReactNode;
}

export function DailyCalendarProvider<T extends DailyCalendarEntity>({
  children,
  ...props
}: ProviderProps<T>) {
  return (
    <DailyCalendarContext.Provider value={props as DailyContextProps}>
      {children}
    </DailyCalendarContext.Provider>
  );
}

export function useDailyCalendarContext() {
  const context = useContext(DailyCalendarContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useDailyCalendarContext must be used within DailyCalendarContext',
    );
  }

  return context;
}
