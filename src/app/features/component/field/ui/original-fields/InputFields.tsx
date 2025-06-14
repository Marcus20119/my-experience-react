import { Form, Input, InputNumber } from 'antd';
import { Eye, EyeSlash } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import type { OriginalFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { Card } from '@/shared/components';

const { OTP, Password, TextArea } = Input;

function InputFields() {
  const { t } = useTranslation();

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.inputText')}
          name="text"
          // rules={[
          //   {
          //     required: true,
          //     whitespace: true,
          //   },
          // ]}
        >
          <Input placeholder={t('component.placeholder.inputText')} />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.inputNumber')}
          name="number"
        >
          <InputNumber
            addonAfter="point"
            changeOnWheel
            max={10}
            min={0}
            placeholder={t('component.placeholder.inputNumber')}
            precision={1}
            step={0.5}
            type="number"
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.inputPassword')}
          name="password"
        >
          <Password
            className="[&_.ant-input-suffix]:cursor-pointer"
            iconRender={visible =>
              visible ? <Eye size={16} /> : <EyeSlash size={16} />
            }
            placeholder={t('component.placeholder.inputPassword')}
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          className="[&_.ant-input-affix-wrapper]:aspect-square [&_.ant-input-suffix]:hidden [&_.ant-input]:text-center [&_.ant-otp]:max-w-full"
          label={t('component.label.inputOTP')}
          name="otp"
        >
          <OTP formatter={str => str.toUpperCase()} size="large" />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.textarea')}
          name="textarea"
        >
          <TextArea
            autoSize={{
              maxRows: 4,
              minRows: 2,
            }}
            maxLength={100}
            placeholder={t('component.placeholder.textarea')}
            showCount
          />
        </Form.Item>
      ),
      span: 16,
    },
  ];

  return <Card.Grid grids={grids} title={t('component.title.inputFields')} />;
}

export default InputFields;
