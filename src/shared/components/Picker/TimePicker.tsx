import { TimePicker as AntTimePicker } from 'antd';
import type { TimePickerProps } from 'antd/lib';
import { Clock, CloseCircle } from 'iconsax-react';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { DEFAULT_TIME_FORMAT } from '@/shared/constants';

function TimePicker({ allowClear, className, ...props }: TimePickerProps) {
  return (
    <AntTimePicker
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
      format={DEFAULT_TIME_FORMAT}
      inputReadOnly
      minuteStep={5}
      needConfirm={false}
      suffixIcon={<Clock className="text-neutral-700" size={20} />}
      {...props}
    />
  );
}

export default TimePicker;
