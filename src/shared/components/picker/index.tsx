import DatePicker from './DatePicker';
import MonthPicker from './MonthPicker';
import RangeDatePicker from './RangeDatePicker';
import RangeTimePicker from './RangeTimePicker';
import TimePicker from './TimePicker';
import WeekPicker from './WeekPicker';

function Picker() {
  return null;
}

Picker.Date = DatePicker;
Picker.Week = WeekPicker;
Picker.Month = MonthPicker;
Picker.Time = TimePicker;
Picker.RangeDate = RangeDatePicker;
Picker.RangeTime = RangeTimePicker;

export { Picker };
