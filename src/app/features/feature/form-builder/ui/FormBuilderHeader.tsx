import type { InputRef } from 'antd';
import { Button, Flex, Input, Tabs, Typography } from 'antd';
import { Edit2 } from 'iconsax-react';
import { useEffect, useRef } from 'react';

import { useToggle } from '@/shared/hooks';

import { useFormBuilderContext } from '../context';
import { DEFAULT_FORM_NAME, FORM_BUILDER_SIZE } from '../model';

const { Title } = Typography;

function FormBuilderHeader() {
  const inputRef = useRef<InputRef>(null);
  const { name, setName } = useFormBuilderContext();

  const {
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
    open: isEdit,
  } = useToggle();

  useEffect(() => {
    if (isEdit) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEdit]);

  return (
    <Flex
      align="center"
      className="w-full"
      justify="space-between"
      style={{
        height: FORM_BUILDER_SIZE.header,
      }}
      vertical
    >
      <Flex align="center" className="w-full px-4 pt-4" justify="space-between">
        {isEdit ? (
          <Input
            className="w-52"
            defaultValue={name}
            onBlur={e => {
              if (!e.target.value) {
                setName(DEFAULT_FORM_NAME);
              } else {
                setName(e.target.value);
              }

              onCloseEdit();
            }}
            ref={inputRef}
          />
        ) : (
          <Flex align="center" gap="0.25rem">
            <Title className="text-lg">{name}</Title>
            <Button
              icon={<Edit2 size="16" />}
              onClick={() => {
                onOpenEdit();
              }}
              type="text"
            />
          </Flex>
        )}

        <Flex align="center" gap="0.5rem">
          <Button>Save as Draft</Button>
          <Button type="primary">Create form</Button>
        </Flex>
      </Flex>

      <Tabs
        centered
        className="w-full [&_.ant-tabs-nav]:m-0"
        defaultActiveKey="Edit"
        items={[
          {
            key: 'Edit',
            label: 'Edit form',
          },
          {
            key: 'Preview',
            label: 'Form preview',
          },
        ]}
        size="middle"
        tabBarGutter={16}
      />
    </Flex>
  );
}

export default FormBuilderHeader;
