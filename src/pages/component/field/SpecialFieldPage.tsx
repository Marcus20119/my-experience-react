import { Flex, Form } from 'antd';

import type { SpecialFieldForm } from '@/app/features/component/field';
import {
  GoogleAPIFields,
  RestCountriesFields,
  UploadFields,
} from '@/app/features/component/field';
import { FieldLayout } from '@/app/layout';

function SpecialFieldPage() {
  const [form] = Form.useForm<SpecialFieldForm>();

  return (
    <FieldLayout
      route={{
        path: '/component/field/special',
      }}
    >
      <Form<SpecialFieldForm> form={form} layout="vertical" size="middle">
        <Flex gap="1rem" vertical>
          <Flex gap="1rem" vertical>
            <RestCountriesFields />
            <GoogleAPIFields />
            <UploadFields />
          </Flex>
        </Flex>
      </Form>
    </FieldLayout>
  );
}

export default SpecialFieldPage;
