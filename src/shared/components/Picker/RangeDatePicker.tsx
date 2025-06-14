import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { Calendar, CloseCircle } from 'iconsax-react';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { DEFAULT_DATE_FORMAT } from '@/shared/constants';

const { RangePicker } = DatePicker;

function RangeDatePicker({
  allowClear,
  className,
  ...props
}: RangePickerProps) {
  return (
    <RangePicker
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

export default RangeDatePicker;
