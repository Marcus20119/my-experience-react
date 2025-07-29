import { Button, Flex, Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { SingleStepFormEntity } from '@/app/features/component/form';
import { SingleStepForm, useFormStore } from '@/app/features/component/form';
import { WIDTH } from '@/shared/assets/styles/constants';
import { Drawer } from '@/shared/components';
import { DEFAULT_TIMEOUT } from '@/shared/constants';

interface Props {
  onCancel: () => void;
}

function FormDrawer({ onCancel }: Props) {
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
    <Drawer.FormWrapper
      footer={
        <Flex align="center" gap="0.5rem" justify="end">
          <Button onClick={onCancel} size="middle">
            {t('common.button.cancel')}
          </Button>
          <Button
            loading={loading}
            onClick={singleStepForm.submit}
            size="middle"
            type="primary"
          >
            {t('common.button.save')}
          </Button>
        </Flex>
      }
      onClose={onCancel}
      open
      title={t('component.title.drawerRouterForm')}
      width={WIDTH.form}
    >
      <SingleStepForm
        form={singleStepForm}
        onFinish={onFinish}
        showButton={false}
      />
    </Drawer.FormWrapper>
  );
}

export default FormDrawer;
