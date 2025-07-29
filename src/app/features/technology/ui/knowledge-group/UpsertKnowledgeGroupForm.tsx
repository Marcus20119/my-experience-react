import { Form, Input } from 'antd';
import type { FormInstance } from 'antd/lib';

import type { UpsertKnowledgeGroupFormEntity } from '@/app/features/technology/model';
import { Field } from '@/shared/components';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

import { TechnologySelect } from '../technology';

interface Props {
  form: FormInstance<UpsertKnowledgeGroupFormEntity>;
  onFinish?: (values: UpsertKnowledgeGroupFormEntity) => void;
  technologySectionId?: string;
  technologyType?: TechnologyType;
}

function UpsertKnowledgeGroupForm({
  form,
  onFinish,
  technologySectionId,
  technologyType,
}: Props) {
  return (
    <Form<UpsertKnowledgeGroupFormEntity>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      size="middle"
    >
      <Form.Item<UpsertKnowledgeGroupFormEntity>
        label="Name ~"
        name={['name', 'original']}
        rules={[{ required: true }]}
      >
        <Input allowClear={false} placeholder="Enter display name ~" />
      </Form.Item>

      <Form.Item<UpsertKnowledgeGroupFormEntity>
        label="Display name ~"
        name={['name', 'translations']}
      >
        <Field.ContentTranslation placeholder="Enter display name ~" />
      </Form.Item>

      <Form.Item<UpsertKnowledgeGroupFormEntity>
        label={'Technology ~'}
        name="technologyId"
        rules={[{ required: true }]}
      >
        <TechnologySelect
          technologySectionId={technologySectionId}
          technologyType={technologyType}
        />
      </Form.Item>

      <Form.Item<UpsertKnowledgeGroupFormEntity>
        label={'Description ~'}
        name="description"
      >
        <Input.TextArea placeholder="Enter description ~" rows={3} />
      </Form.Item>
    </Form>
  );
}

export default UpsertKnowledgeGroupForm;
