import { Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { SingleStepFormEntity } from '@/app/features/component/form';
import { SingleStepForm, useFormStore } from '@/app/features/component/form';
import { WIDTH } from '@/shared/assets/styles/constants';
import { Modal } from '@/shared/components';
import { DEFAULT_TIMEOUT } from '@/shared/constants';

interface Props {
  onCancel: () => void;
}

function FormModal({ onCancel }: Props) {
  const { t } = useTranslation();
  const [singleStepForm] = Form.useForm<SingleStepFormEntity>();
  const { setFormStates, singleStepFormValue } = useFormStore();

  const [loading, setLoading] = useState(false);

  const onFinish = (values: SingleStepFormEntity) => {
    setLoading(true);

    setTimeout(() => {
      setFormStates({
        singleStepFormValue: {
          ...singleStepFormValue,
          ...values,
        },
      });
      onCancel();
      setLoading(false);
    }, DEFAULT_TIMEOUT);
  };

  return (
    <Modal.FormWrapper
      okButtonProps={{
        loading,
        onClick: singleStepForm.submit,
      }}
      onCancel={onCancel}
      open={true}
      title={t('component.title.modalRouterForm')}
      width={WIDTH.form}
    >
      <SingleStepForm
        form={singleStepForm}
        onFinish={onFinish}
        showButton={false}
      />
    </Modal.FormWrapper>
  );
}

export default FormModal;
