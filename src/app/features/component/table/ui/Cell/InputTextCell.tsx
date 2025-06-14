import type { InputProps, InputRef } from 'antd';
import { Input } from 'antd';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/tailwind';

interface Props extends InputProps {
  editing: boolean;
  onSave: () => Promise<void>;
}

function InputTextCell({ className, editing, onSave, ...props }: Props) {
  const ref = useRef<InputRef>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
      ref.current?.select();
    }
  }, [editing]);

  return (
    <Input
      className={cn('w-full', className)}
      onBlur={onSave}
      onPressEnter={onSave}
      ref={ref}
      size="small"
      {...props}
    />
  );
}

export default InputTextCell;
