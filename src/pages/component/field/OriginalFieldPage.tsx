import { Flex, Form } from 'antd';

import type { OriginalFieldForm } from '@/app/features/component/field';
import {
  BooleanFields,
  DatePickerFields,
  InputFields,
  OtherFields,
  SelectFields,
} from '@/app/features/component/field';
import { FieldLayout } from '@/app/layout';

function OriginalFieldPage() {
  const [form] = Form.useForm<OriginalFieldForm>();

  return (
    <FieldLayout
      route={{
        path: '/component/field/original',
      }}
    >
      <Form<OriginalFieldForm> form={form} layout="vertical" size="middle">
        <Flex gap="1rem" vertical>
          <InputFields />
          <SelectFields />
          <DatePickerFields />
          <BooleanFields />
          <OtherFields />
        </Flex>
      </Form>
    </FieldLayout>
  );
}

export default OriginalFieldPage;
