import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd/lib';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/tailwind';
import { DateTimeTool } from '@/shared/utils';

const { formatDate } = DateTimeTool;

interface Props extends DatePickerProps {
  editing: boolean;
  onSave: () => Promise<void>;
}

function InputDateCell({ className, editing, onSave, ...props }: Props) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (editing && inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, [editing]);

  return (
    <DatePicker
      allowClear={false}
      className={cn('w-full', className)}
      format={day => formatDate(day)}
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

export default InputDateCell;
