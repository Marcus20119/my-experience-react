import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import type { SpecialFieldForm } from '@/app/features/component/field';
import type { GridCardItem } from '@/shared/components';
import { Card, Field } from '@/shared/components';
import { DOCUMENT_TYPES, IMAGE_TYPES } from '@/shared/constants';

function GoogleAPIFields() {
  const { t } = useTranslation();

  const grids: GridCardItem[] = [
    {
      content: (
        <Form.Item<SpecialFieldForm>
          label={t('component.label.singleFile')}
          name="singleFile"
        >
          <Field.UploadFile acceptTypes={IMAGE_TYPES} maxFileSize={20} />
        </Form.Item>
      ),
      span: 8,
    },
    {
      content: (
        <Form.Item<SpecialFieldForm>
          label={t('component.label.multipleFiles')}
          name="multipleFiles"
          valuePropName="fileList"
        >
          <Field.UploadFile
            acceptTypes={DOCUMENT_TYPES}
            maxFileSize={10}
            multiple
          />
        </Form.Item>
      ),
      span: 8,
    },
  ];

  return <Card.Grid grids={grids} title={t('component.title.uploadFields')} />;
}

export default GoogleAPIFields;
