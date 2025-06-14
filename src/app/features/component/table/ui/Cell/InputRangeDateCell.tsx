import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/tailwind';
import { DateTimeTool } from '@/shared/utils';

const { RangePicker } = DatePicker;

interface Props extends RangePickerProps {
  editing: boolean;
  onSave: () => Promise<void>;
}

function InputRangeDateCell({ className, editing, onSave, ...props }: Props) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (editing && inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, [editing]);

  return (
    <RangePicker
      allowClear={false}
      className={cn('w-full', className)}
      format={day => DateTimeTool.formatDate(day)}
      onBlur={() => {
        if (!open) {
          onSave();
        }
      }}
      onOpenChange={open => {
        setOpen(open);

        if (!open) {
          onSave();
        }
      }}
      open={open}
      ref={inputRef}
      size="small"
      suffixIcon={null}
      {...props}
    />
  );
}

export default InputRangeDateCell;
