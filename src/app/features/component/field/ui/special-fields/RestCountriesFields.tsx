import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import type { SpecialFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { Card, Field } from '@/shared/components';

function RestCountriesFields() {
  const { t } = useTranslation();

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<SpecialFieldForm>
          label={t('component.label.phoneNumberOnline')}
          name="phoneNumberOnline"
          tooltip={t('component.tooltip.restCountriesOnline')}
        >
          <Field.PhoneNumberOnline />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<SpecialFieldForm>
          label={t('component.label.phoneNumberOffline')}
          name="phoneNumberOffline"
          tooltip={t('component.tooltip.restCountriesOffline')}
        >
          <Field.PhoneNumberOffline />
        </Form.Item>
      ),
      span: 8,
    },
    {
      span: 8,
    },
    {
      content: (
        <Form.Item<SpecialFieldForm>
          label={t('component.label.nationalityOnline')}
          name="nationalityOnline"
          tooltip={t('component.tooltip.restCountriesOnline')}
        >
          <Field.NationalityOnline
            placeholder={t('component.label.nationalityOnline')}
          />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<SpecialFieldForm>
          label={t('component.label.nationalityOffline')}
          name="nationalityOffline"
          tooltip={t('component.tooltip.restCountriesOffline')}
        >
          <Field.NationalityOffline
            placeholder={t('component.label.nationalityOffline')}
          />
        </Form.Item>
      ),
      span: 8,
    },
  ];

  return (
    <Card.Grid
      grids={grids}
      title={t('component.title.restCountriesAPIFields')}
    />
  );
}

export default RestCountriesFields;
