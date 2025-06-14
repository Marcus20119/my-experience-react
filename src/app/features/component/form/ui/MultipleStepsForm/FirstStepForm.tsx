import { Button, Col, Flex, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import type { MultipleFormFirstStepEntity } from '@/app/features/component/form';
import { Picker } from '@/shared/components';

interface Props {
  form?: FormInstance<MultipleFormFirstStepEntity>;
  loading?: boolean;
  onFinish?: (values: MultipleFormFirstStepEntity) => void;
  showButton?: boolean;
}

function FirstStepForm({ form, loading, onFinish, showButton = true }: Props) {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item<MultipleFormFirstStepEntity>
            label={t('component.label.fullName')}
            name="fullName"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.fullName')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormFirstStepEntity>
            label={t('component.label.email')}
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder={t('component.placeholder.email')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormFirstStepEntity>
            label={t('component.label.phoneNumber')}
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.phoneNumber')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormFirstStepEntity>
            label={t('component.label.dateOfBirth')}
            name="dateOfBirth"
          >
            <Picker.Date placeholder={t('component.placeholder.dateOfBirth')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormFirstStepEntity>
            label={t('component.label.city')}
            name="city"
          >
            <Input placeholder={t('component.placeholder.city')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormFirstStepEntity>
            label={t('component.label.country')}
            name="address"
          >
            <Input placeholder={t('component.placeholder.country')} />
          </Form.Item>
        </Col>
      </Row>

      {showButton ? (
        <Flex justify="end">
          <Button htmlType="submit" loading={loading} type="primary">
            {t('common.button.next')}
          </Button>
        </Flex>
      ) : null}
    </Form>
  );
}

export default FirstStepForm;
