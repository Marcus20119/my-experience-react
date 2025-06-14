import styled from '@emotion/styled';

import { DAILY_Z_INDEX, WEEKLY_Z_INDEX } from '../model';

export const DailyCalendarStyled = styled.div`
  .ant-table-cell {
    padding: 0 !important;
  }

  td {
    background-color: white !important;
  }

  th {
    height: 3rem !important; // 48px
  }

  .ant-table-cell:has(#time-range) {
    z-index: ${DAILY_Z_INDEX.rangeTimeCell} !important;
  }

  .calendar-item:hover {
    z-index: ${DAILY_Z_INDEX.itemHover} !important;
  }
`;

export const WeeklyCalendarStyled = styled.div`
  .ant-table-cell {
    padding: 0 !important;
  }

  td {
    background-color: white !important;
  }

  th {
    height: 3rem !important; // 48px
  }

  .ant-table-cell:has(#time-range) {
    z-index: ${WEEKLY_Z_INDEX.rangeTimeCell} !important;
  }

  .calendar-item:hover {
    z-index: ${WEEKLY_Z_INDEX.itemHover} !important;
  }
`;

export const MonthlyCalendarStyled = styled.div`
  .ant-table-cell {
    padding: 0 !important;
  }

  td {
    background-color: white !important;
  }

  th {
    height: 3rem !important; // 48px
  }
`;
