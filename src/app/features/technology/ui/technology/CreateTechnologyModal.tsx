import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import type { UpsertTechnologyFormEntity } from '@/app/features/technology/model';
import { Modal } from '@/shared/components';
import { useAppRouter } from '@/shared/hooks';

import UpsertTechnologyForm from './UpsertTechnologyForm';

interface Props {
  onCancel: () => void;
}

function CreateTechnologyModal({ onCancel }: Props) {
  const { t } = useTranslation();
  const { navigate, param } = useAppRouter(
    '/technology-type/:type/technology-section/:section',
  );
  const [form] = Form.useForm<UpsertTechnologyFormEntity>();

  return (
    <Modal.FormWrapper
      okButtonProps={{
        loading: false,
        onClick: () => {
          form.submit();

          const values = form.getFieldsValue();
          console.log('🚀 ~ CreateTechnologyModal ~ values:', values);
        },
      }}
      okText={t('common.button.create')}
      onCancel={onCancel}
      open={true}
      title={`Create section for ${param.type} ~`}
      width={600}
    >
      <UpsertTechnologyForm
        form={form}
        onFinish={values => {
          console.log(' values:', values);
        }}
      />
    </Modal.FormWrapper>
  );
}

export default CreateTechnologyModal;
