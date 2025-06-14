import type { Locale } from 'antd/es/locale';
import localeValues from 'antd/es/locale/vi_VN';
import TimePickerLocale from 'antd/es/time-picker/locale/vi_VN';

const viVN: Locale = {
  ...localeValues,
  ['DatePicker']: {
    lang: {
      ...localeValues.DatePicker?.lang,
      backToToday: 'Quay về hôm nay',
      clear: 'Xóa',
      dateSelect: 'Chọn ngày',
      decadeSelect: 'Chọn thập kỷ',
      locale: 'vi',
      month: 'Tháng',
      monthSelect: 'Chọn tháng',
      nextCentury: 'Thế kỷ sau',
      nextDecade: 'Thập kỷ sau',
      nextMonth: 'Tháng sau',
      nextYear: 'Năm sau',
      now: 'Hiện tại',
      ok: 'Đồng ý',
      placeholder: 'Chọn ngày',
      previousCentury: 'Thế kỷ trước',
      previousDecade: 'Thập kỷ trước',
      previousMonth: 'Tháng trước',
      previousYear: 'Năm trước',
      shortMonths: [
        'Th1',
        'Th2',
        'Th3',
        'Th4',
        'Th5',
        'Th6',
        'Th7',
        'Th8',
        'Th9',
        'Th10',
        'Th11',
        'Th12',
      ],
      shortWeekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      timeSelect: 'Chọn giờ',
      today: 'Hôm nay',
      week: 'Tuần',
      year: 'Năm',
      yearSelect: 'Chọn năm',
    },
    timePickerLocale: {
      ...TimePickerLocale,
    },
  },
  ['Image']: {
    preview: 'Xem ảnh',
  },
};

export default viVN;
