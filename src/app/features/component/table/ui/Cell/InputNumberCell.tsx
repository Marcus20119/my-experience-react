import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { useEffect, useRef } from 'react';

import { NumberTool } from '@/shared/utils';

interface Props extends InputNumberProps {
  editing: boolean;
  onSave: () => Promise<void>;
}

function InputNumberCell({ editing, onSave, ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      ref.current?.focus();
      ref.current?.select();
    }
  }, [editing]);

  return (
    <InputNumber
      className="w-full"
      formatter={NumberTool.formatterInputNumber}
      onBlur={onSave}
      onKeyDown={e =>
        !['Enter', 'ArrowLeft', 'ArrowRight', 'Backspace'].includes(e.key) &&
        isNaN(Number(e.key)) &&
        e.preventDefault()
      }
      onPressEnter={onSave}
      parser={NumberTool.parserInputNumber}
      ref={ref}
      size="small"
      {...props}
    />
  );
}

export default InputNumberCell;
