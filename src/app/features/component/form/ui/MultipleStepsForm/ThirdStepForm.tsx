import { Button, Col, Flex, Form, Input, InputNumber, Row } from 'antd';
import type { FormInstance } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import type { MultipleFormThirdStepEntity } from '@/app/features/component/form';
import { Picker } from '@/shared/components';

interface Props {
  form?: FormInstance<MultipleFormThirdStepEntity>;
  loading?: boolean;
  onBack?: () => void;
  onFinish?: (values: MultipleFormThirdStepEntity) => void;
  showButton?: boolean;
}

function ThirdStepForm({
  form,
  loading,
  onBack,
  onFinish,
  showButton = true,
}: Props) {
  const { t } = useTranslation();

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} size="middle">
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item<MultipleFormThirdStepEntity>
            label={t('component.label.highestEducationLevel')}
            name="highestEducationLevel"
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('component.placeholder.highestEducationLevel')}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormThirdStepEntity>
            label={t('component.label.major')}
            name="major"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.major')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormThirdStepEntity>
            label={t('component.label.university')}
            name="university"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.university')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormThirdStepEntity>
            label={t('component.label.gpa')}
            name="gpa"
            rules={[{ required: true }]}
          >
            <InputNumber
              max={4}
              min={0}
              placeholder={t('component.placeholder.gpa')}
              precision={2}
              step={0.01}
              type="number"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormThirdStepEntity>
            label={t('component.label.graduationDate')}
            name="graduationDate"
          >
            <Picker.Date
              placeholder={t('component.placeholder.graduationDate')}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<MultipleFormThirdStepEntity>
            label={t('component.label.relevantCourses')}
            name="relevantCourses"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.relevantCourses')} />
          </Form.Item>
        </Col>
      </Row>

      {showButton ? (
        <Flex gap="0.5rem" justify="end">
          <Button htmlType="submit" onClick={onBack}>
            {t('common.button.back')}
          </Button>
          <Button htmlType="submit" loading={loading} type="primary">
            {t('common.button.next')}
          </Button>
        </Flex>
      ) : null}
    </Form>
  );
}

export default ThirdStepForm;
