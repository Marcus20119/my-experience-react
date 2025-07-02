import { Form, Input } from 'antd';
import type { FormInstance } from 'antd/lib';

import { Field } from '@/shared/components';

import type { UpsertTechnologySectionFormEntity } from '../model';

interface Props {
  form: FormInstance<UpsertTechnologySectionFormEntity>;
  onFinish?: (values: UpsertTechnologySectionFormEntity) => void;
}

function UpsertTechnologySectionForm({ form, onFinish }: Props) {
  return (
    <Form<UpsertTechnologySectionFormEntity>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      size="middle"
    >
      <Form.Item<UpsertTechnologySectionFormEntity>
        label="Name ~"
        name={['name', 'original']}
        rules={[{ required: true }]}
      >
        <Input allowClear={false} placeholder="Enter display name ~" />
      </Form.Item>

      <Form.Item<UpsertTechnologySectionFormEntity>
        label="Display name ~"
        name={['name', 'translations']}
      >
        <Field.ContentTranslation placeholder="Enter display name ~" />
      </Form.Item>
    </Form>
  );
}

export default UpsertTechnologySectionForm;
