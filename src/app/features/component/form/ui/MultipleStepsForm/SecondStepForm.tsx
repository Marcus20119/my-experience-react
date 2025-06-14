import { Button, Col, Flex, Form, Input, InputNumber, Row } from 'antd';
import type { FormInstance } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import type { MultipleFormSecondStepEntity } from '@/app/features/component/form';

interface Props {
  form?: FormInstance<MultipleFormSecondStepEntity>;
  loading?: boolean;
  onBack?: () => void;
  onFinish?: (values: MultipleFormSecondStepEntity) => void;
  showButton?: boolean;
}

function SecondStepForm({
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
          <Form.Item<MultipleFormSecondStepEntity>
            label={t('component.label.companyName')}
            name="companyName"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.companyName')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormSecondStepEntity>
            label={t('component.label.currentJobTitle')}
            name="currentJobTitle"
            rules={[{ required: true }]}
          >
            <Input placeholder={t('component.placeholder.currentJobTitle')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormSecondStepEntity>
            label={t('component.label.yearsOfExperience')}
            name="yearsOfExperience"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              placeholder={t('component.placeholder.yearsOfExperience')}
              precision={1}
              step={0.5}
              type="number"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item<MultipleFormSecondStepEntity>
            label={t('component.label.previousCompanyName')}
            name="previousCompanyName"
          >
            <Input
              placeholder={t('component.placeholder.previousCompanyName')}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormSecondStepEntity>
            label={t('component.label.previousJobTitle')}
            name="previousJobTitle"
          >
            <Input placeholder={t('component.placeholder.previousJobTitle')} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<MultipleFormSecondStepEntity>
            label={t('component.label.yearsOfExperience')}
            name="yearsOfExperienceInPreviousJob"
          >
            <InputNumber
              min={0}
              placeholder={t('component.placeholder.yearsOfExperience')}
              precision={1}
              step={0.5}
              type="number"
            />
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

export default SecondStepForm;
