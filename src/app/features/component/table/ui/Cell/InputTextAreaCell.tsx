import type { InputRef } from 'antd';
import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import { useEffect, useRef } from 'react';

import { cn } from '@/lib/tailwind';

const { TextArea } = Input;

interface Props extends TextAreaProps {
  editing: boolean;
  onSave: () => Promise<void>;
}

function InputTextAreaCell({ className, editing, onSave, ...props }: Props) {
  const ref = useRef<InputRef>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
    }
  }, [editing]);

  return (
    <TextArea
      className={cn('w-full', className)}
      onBlur={onSave}
      ref={ref}
      size="small"
      {...props}
    />
  );
}

export default InputTextAreaCell;
