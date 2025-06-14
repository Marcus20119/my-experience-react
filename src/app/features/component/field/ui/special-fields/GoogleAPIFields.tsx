import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import type { SpecialFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { Card, Field } from '@/shared/components';

function GoogleAPIFields() {
  const { t } = useTranslation();

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<SpecialFieldForm>
          label={t('component.label.autocompleteAddress')}
          name="google"
        >
          <Field.GoogleAddressField
            placeholder={t('component.placeholder.autocompleteAddress')}
          />
        </Form.Item>
      ),
      span: 12,
    },
  ];

  return (
    <Card.Grid grids={grids} title={t('component.title.googleAPIFields')} />
  );
}

export default GoogleAPIFields;
