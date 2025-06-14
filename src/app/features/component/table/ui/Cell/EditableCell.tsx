import type { InputRef } from 'antd';
import { Flex, Form } from 'antd';
import type { AnyObject } from 'antd/lib/_util/type';
import { useContext, useEffect, useRef, useState } from 'react';

import type { AdditionalEditableTableProps } from '@/app/features/component/table';
import { EditableContext } from '@/app/features/component/table';
import { cn } from '@/lib/tailwind';

import InputDateCell from './InputDateCell';
import InputNumberCell from './InputNumberCell';
import InputRangeDateCell from './InputRangeDateCell';
import InputTextAreaCell from './InputTextAreaCell';
import InputTextCell from './InputTextCell';

interface Props<T extends AnyObject> extends AdditionalEditableTableProps<T> {
  children: React.ReactNode;
  handleSave: (record: T) => void;
  record: T;
  render?: () => React.ReactNode;
  width?: number;
}

function EditableCell<T extends AnyObject>({
  children,
  dataIndex,
  disabled,
  editable,
  handleSave,
  inputDateProps,
  inputNumberProps,
  inputRangeDateProps,
  inputTextAreaProps,
  inputTextProps,
  inputType = 'number',
  record,
  render: _render, // do not pass this prop to the td element
  width: _width, // do not pass this prop to the td element
  ...restProps
}: Props<T>) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);

    if (dataIndex) {
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  };

  const onSave = async () => {
    try {
      const values = (await form.validateFields()) as T;
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      //TODO
    }
  };

  let childNode = children;

  const isDisabled =
    typeof disabled === 'function' ? disabled(record) : disabled;

  if (editable) {
    childNode = editing ? (
      <Form.Item name={dataIndex as string} style={{ margin: 0 }}>
        {(() => {
          if (inputType === 'number') {
            const max =
              typeof inputNumberProps?.max === 'function'
                ? inputNumberProps.max(record)
                : inputNumberProps?.max;

            const min =
              typeof inputNumberProps?.min === 'function'
                ? inputNumberProps.min(record)
                : inputNumberProps?.min;

            return (
              <InputNumberCell
                editing={editing}
                onSave={onSave}
                {...inputNumberProps}
                max={max}
                min={min}
              />
            );
          }

          if (inputType === 'rangeDate') {
            return (
              <InputRangeDateCell
                editing={editing}
                onSave={onSave}
                {...inputRangeDateProps}
              />
            );
          }

          if (inputType === 'text') {
            return (
              <InputTextCell
                editing={editing}
                onSave={onSave}
                {...inputTextProps}
              />
            );
          }

          if (inputType === 'date') {
            return (
              <InputDateCell
                editing={editing}
                onSave={onSave}
                {...inputDateProps}
              />
            );
          }

          if (inputType === 'textarea') {
            return (
              <InputTextAreaCell
                editing={editing}
                onSave={onSave}
                {...inputTextAreaProps}
              />
            );
          }
        })()}
      </Form.Item>
    ) : (
      <Flex
        className={cn(
          isDisabled ? 'disabled-cell-value-wrap' : 'editable-cell-value-wrap',
        )}
        onClick={() => !isDisabled && toggleEdit()}
      >
        {children}&nbsp;
      </Flex>
    );
  }

  return <td {...restProps}>{childNode}</td>;
}

export default EditableCell;
