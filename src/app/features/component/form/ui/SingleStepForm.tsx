import { Button, Col, Flex, Form, Input, Row } from 'antd';
import type { FormInstance } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import type { SingleStepFormEntity } from '../model';

const { TextArea } = Input;

interface Props {
  form?: FormInstance<SingleStepFormEntity>;
  onFinish?: (values: SingleStepFormEntity) => void;
  showButton?: boolean;
}

function SingleStepForm({ form, onFinish, showButton = true }: Props) {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.fullName')}
            name="fullName"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.label.fullName')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.email')}
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input placeholder={t('component.placeholder.email')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.city')}
            name="city"
          >
            <Input placeholder={t('component.placeholder.city')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.country')}
            name="country"
          >
            <Input placeholder={t('component.placeholder.country')} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.address')}
            name="address"
          >
            <TextArea
              placeholder={t('component.placeholder.address')}
              rows={4}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.phoneNumber')}
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.phoneNumber')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.state')}
            name="state"
          >
            <Input placeholder={t('component.placeholder.state')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.zipCode')}
            name="zip"
          >
            <Input placeholder={t('component.placeholder.zipCode')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<SingleStepFormEntity>
            label={t('component.label.major')}
            name="major"
          >
            <Input placeholder={t('component.placeholder.major')} />
          </Form.Item>
        </Col>
      </Row>

      {showButton ? (
        <Flex justify="end">
          <Button htmlType="submit" type="primary">
            {t('common.button.save')}
          </Button>
        </Flex>
      ) : null}
    </Form>
  );
}

export default SingleStepForm;
