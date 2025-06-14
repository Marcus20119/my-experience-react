import {
  Checkbox,
  Col,
  Flex,
  Form,
  Radio,
  Row,
  Switch,
  Typography,
} from 'antd';
import type { CheckboxOptionType } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import type { OriginalFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { Card } from '@/shared/components';

const { Text } = Typography;

function BooleanFields() {
  const { t } = useTranslation();

  const checkboxOptions: CheckboxOptionType[] = [
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { disabled: true, label: 'C++', value: 'c++' },
    { label: 'C#', value: 'c#' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'PHP', value: 'php' },
    { label: 'Go', value: 'go' },
    { label: 'Swift', value: 'swift' },
  ];

  const radioOptions: CheckboxOptionType[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.checkbox')}
          name="checkbox"
          valuePropName="checked"
        >
          <Checkbox>{t('component.value.agreeWithOurConditions')}</Checkbox>
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.checkboxGroup')}
          name="checkboxGroup"
        >
          <Checkbox.Group className="w-full">
            <Row>
              {checkboxOptions.map(option => (
                <Col key={option.value} span={6}>
                  <Checkbox disabled={option.disabled} value={option.value}>
                    {option.label}
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
      ),
      span: 16,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.switch')}
          name="switch"
        >
          <Flex align="center" gap="0.5rem">
            <Switch />
            <Text>{t('component.value.apply')}</Text>
          </Flex>
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<OriginalFieldForm>
          label={t('component.label.radioGroup')}
          name="radioGroup"
        >
          <Radio.Group options={radioOptions} />
        </Form.Item>
      ),
      span: 16,
    },
  ];

  return <Card.Grid grids={grids} title={t('component.title.booleanFields')} />;
}

export default BooleanFields;
