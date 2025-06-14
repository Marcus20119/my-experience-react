import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps } from 'antd/lib';
import { Calendar, CloseCircle } from 'iconsax-react';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { DEFAULT_DATE_FORMAT } from '@/shared/constants';

function DatePicker({ allowClear, className, ...props }: DatePickerProps) {
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
      format={DEFAULT_DATE_FORMAT}
      suffixIcon={<Calendar className="text-neutral-700" size="20" />}
      {...props}
    />
  );
}

export default DatePicker;
