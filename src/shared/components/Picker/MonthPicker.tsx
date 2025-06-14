import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import { Calendar, CloseCircle } from 'iconsax-react';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { DEFAULT_FULL_MONTH_FORMAT } from '@/shared/constants';

function MonthPicker({ allowClear, className, ...props }: DatePickerProps) {
  return (
    <AntDatePicker
      allowClear={
        allowClear
          ? {
              clearIcon: (
                <CloseCircle
                  color={COLOR.neutral['400']}
                  size="20"
                  variant="Bold"
                />
              ),
            }
          : false
      }
      className={cn('w-full', className)}
      format={value =>
        dayjs(value)
          .startOf('week')
          .format(DEFAULT_FULL_MONTH_FORMAT)
          .replace(/Th0?/, 'Th')
      }
      picker="month"
      suffixIcon={<Calendar className="text-neutral-700" size="20" />}
      {...props}
    />
  );
}

export default MonthPicker;
