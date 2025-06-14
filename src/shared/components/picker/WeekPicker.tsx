import { DatePicker as AntDatePicker } from 'antd';
import type { DatePickerProps } from 'antd/lib';
import dayjs from 'dayjs';
import { Calendar, CloseCircle } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { DEFAULT_DATE_FORMAT } from '@/shared/constants';

function WeekPicker({ allowClear, className, ...props }: DatePickerProps) {
  const { i18n } = useTranslation();

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
      format={value => {
        if (i18n.language === 'vi') {
          return `${dayjs(value).startOf('week').add(1, 'day').format(DEFAULT_DATE_FORMAT)} ~ ${dayjs(
            value,
          )
            .endOf('week')
            .add(1, 'day')
            .format(DEFAULT_DATE_FORMAT)}`;
        }

        return `${dayjs(value).startOf('week').format(DEFAULT_DATE_FORMAT)} ~ ${dayjs(
          value,
        )
          .endOf('week')
          .format(DEFAULT_DATE_FORMAT)}`;
      }}
      picker="week"
      suffixIcon={<Calendar className="text-neutral-700" size="20" />}
      {...props}
    />
  );
}

export default WeekPicker;
