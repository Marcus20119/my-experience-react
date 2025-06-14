/* eslint-disable max-lines */
import { Button, Flex, Form, Progress, Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
  MultipleFormFirstStepEntity,
  MultipleFormSecondStepEntity,
  MultipleFormThirdStepEntity,
  SingleStepFormEntity,
} from '@/app/features/component/form';
import {
  MultipleStepsForm,
  SingleStepForm,
  useFormStore,
} from '@/app/features/component/form';
import { FormLayout } from '@/app/layout';
import { WIDTH } from '@/shared/assets/styles/constants/width';
import { Drawer, Modal } from '@/shared/components';
import { DEFAULT_TIMEOUT } from '@/shared/constants';
import { useDrawerRouter, useModalRouter, useToggle } from '@/shared/hooks';

const { Text, Title } = Typography;

function SpecialFormPage() {
  const { t } = useTranslation();
  const {
    onClose: onCloseModalSingle,
    onOpen: onOpenModalSingle,
    open: openModalSingle,
  } = useToggle();
  const {
    onClose: onCloseModalMultiple,
    onOpen: onOpenModalMultiple,
    open: openModalMultiple,
  } = useToggle();
  const {
    onClose: onCloseModalProgress,
    onOpen: onOpenModalProgress,
    open: openModalProgress,
  } = useToggle();
  const {
    onClose: onCloseDrawerSingle,
    onOpen: onOpenDrawerSingle,
    open: openDrawerSingle,
  } = useToggle();
  const {
    onClose: onCloseDrawerMultiple,
    onOpen: onOpenDrawerMultiple,
    open: openDrawerMultiple,
  } = useToggle();
  const {
    onClose: onCloseDrawerProgress,
    onOpen: onOpenDrawerProgress,
    open: openDrawerProgress,
  } = useToggle();
  const {
    onClose: onCloseInfoConfirmModal,
    onOpen: onOpenInfoConfirmModal,
    open: openInfoConfirmModal,
  } = useToggle();
  const {
    onClose: onCloseWarningConfirmModal,
    onOpen: onOpenWarningConfirmModal,
    open: openWarningConfirmModal,
  } = useToggle();
  const {
    onClose: onCloseErrorConfirmModal,
    onOpen: onOpenErrorConfirmModal,
    open: openErrorConfirmModal,
  } = useToggle();
  const {
    onClose: onCloseSuccessConfirmModal,
    onOpen: onOpenSuccessConfirmModal,
    open: openSuccessConfirmModal,
  } = useToggle();
  const { onOpenModal } = useModalRouter();
  const { onOpenDrawer } = useDrawerRouter();

  const [singleStepForm] = Form.useForm<SingleStepFormEntity>();
  const [multipleFirstStepForm] = Form.useForm<MultipleFormFirstStepEntity>();
  const [multipleSecondStepForm] = Form.useForm<MultipleFormSecondStepEntity>();
  const [multipleThirdStepForm] = Form.useForm<MultipleFormThirdStepEntity>();
  const {
    currentStep = 1,
    multipleStepFormValue,
    setFormStates,
    singleStepFormValue,
  } = useFormStore();

  const [loading, setLoading] = useState(false);

  const specialFormItems = [
    {
      children: [
        {
          onClick: onOpenModalSingle,
          title: t('component.button.singleStep'),
        },
        {
          onClick: onOpenModalMultiple,
          title: t('component.button.multipleSteps'),
        },
        {
          onClick: onOpenModalProgress,
          title: t('component.button.progress'),
        },
      ],
      description: t('component.description.modalForm'),
      title: t('component.title.modalForm'),
    },
    {
      children: [
        {
          onClick: onOpenDrawerSingle,
          title: t('component.button.singleStep'),
        },
        {
          onClick: onOpenDrawerMultiple,
          title: t('component.button.multipleSteps'),
        },
        {
          onClick: onOpenDrawerProgress,
          title: t('component.button.progress'),
        },
      ],
      description: t('component.description.drawerForm'),
      title: t('component.title.drawerForm'),
    },
    {
      children: [
        {
          onClick: () => onOpenModal({ path: 'user/edit' }),
          title: t('component.button.modal'),
        },
        {
          onClick: () => onOpenDrawer({ path: 'user/edit' }),
          title: t('component.button.drawer'),
        },
      ],
      description: t('component.description.routerForm'),
      title: t('component.title.routerForm'),
    },
    {
      children: [
        {
          onClick: onOpenInfoConfirmModal,
          title: t('component.button.info'),
        },
        {
          onClick: onOpenWarningConfirmModal,
          title: t('component.button.warning'),
        },
        {
          onClick: onOpenErrorConfirmModal,
          title: t('component.button.error'),
        },
        {
          onClick: onOpenSuccessConfirmModal,
          title: t('component.button.success'),
        },
      ],
      title: t('component.title.confirmForm'),
    },
  ];

  const onCancel = () => {
    onCloseModalSingle();
    onCloseModalMultiple();
    onCloseModalProgress();
    onCloseDrawerSingle();
    onCloseDrawerMultiple();
    onCloseDrawerProgress();
    onCloseInfoConfirmModal();
    onCloseWarningConfirmModal();
    onCloseErrorConfirmModal();
    onCloseSuccessConfirmModal();
    singleStepForm.resetFields();
    multipleFirstStepForm.resetFields();
    multipleSecondStepForm.resetFields();
    setFormStates({
      currentStep: 1,
      multipleStepFormValue: undefined,
      singleStepFormValue: undefined,
    });
  };

  // ----- Single step form -----
  const onFinishSingleStep = (values: SingleStepFormEntity) => {
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

  // ----- Multiple steps form -----
  const onNext = () => {
    setFormStates({
      currentStep: currentStep + 1,
    });
  };

  const onPrevious = () => {
    setFormStates({
      currentStep: currentStep - 1,
    });
  };

  const onFinishFirstStep = (values: MultipleFormFirstStepEntity) => {
    setLoading(true);

    setTimeout(() => {
      setFormStates({
        multipleStepFormValue: {
          ...multipleStepFormValue,
          firstStep: values,
        },
      });
      setLoading(false);
      onNext();
    }, DEFAULT_TIMEOUT);
  };

  const onFinishSecondStep = (values: MultipleFormSecondStepEntity) => {
    setLoading(true);

    setTimeout(() => {
      setFormStates({
        multipleStepFormValue: {
          ...multipleStepFormValue,
          secondStep: values,
        },
      });
      setLoading(false);
      onNext();
    }, DEFAULT_TIMEOUT);
  };

  const onFinishThirdStep = (values: MultipleFormThirdStepEntity) => {
    setLoading(true);

    setTimeout(() => {
      setFormStates({
        multipleStepFormValue: {
          ...multipleStepFormValue,
          thirdStep: values,
        },
      });
      setLoading(false);
      onCancel();
    }, DEFAULT_TIMEOUT);
  };

  const onClickNext = () => {
    if (currentStep === 1) {
      multipleFirstStepForm.submit();
      return;
    }

    if (currentStep === 2) {
      multipleSecondStepForm.submit();
      return;
    }

    if (currentStep === 3) {
      multipleThirdStepForm.submit();
      return;
    }
  };

  // ----- Progress form -----
  const progress = Form.useWatch(values => {
    const { email, fullName, phoneNumber } = values;

    const valuesArray = [email, fullName, phoneNumber];

    const percent =
      (valuesArray.filter(Boolean).length / valuesArray.length) * 100;

    return Math.round(percent);
  }, singleStepForm);

  // ----- Confirm form -----
  const onFinishConfirm = () => {
    setLoading(true);

    setTimeout(() => {
      onCancel();
      setLoading(false);
    }, DEFAULT_TIMEOUT);
  };

  return (
    <>
      <FormLayout
        route={{
          path: '/component/form/special',
        }}
      >
        <Flex align="center" className="w-full" gap="2rem" vertical>
          {specialFormItems.map((item, index) => (
            <Flex align="center" gap="1rem" key={index} vertical>
              <Flex align="center" vertical>
                <Title className="text-2xl font-bold tracking-wider" level={2}>
                  {item.title}
                </Title>
                <Text>{item.description}</Text>
              </Flex>
              <Flex gap="0.5rem">
                {item.children.map((child, childIndex) => (
                  <Button
                    key={childIndex}
                    onClick={child.onClick}
                    size="middle"
                    type="primary"
                  >
                    {child.title}
                  </Button>
                ))}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </FormLayout>

      {/* Single step form */}
      <Modal.FormWrapper
        okButtonProps={{
          loading,
          onClick: singleStepForm.submit,
        }}
        onCancel={onCancel}
        open={openModalSingle}
        title={t('component.title.modalSingleStepForm')}
        width={WIDTH.form}
      >
        <SingleStepForm
          form={singleStepForm}
          onFinish={onFinishSingleStep}
          showButton={false}
        />
      </Modal.FormWrapper>

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
        open={openDrawerSingle}
        title={t('component.title.drawerSingleStepForm')}
        width={WIDTH.form}
      >
        <SingleStepForm
          form={singleStepForm}
          onFinish={onFinishSingleStep}
          showButton={false}
        />
      </Drawer.FormWrapper>

      {/* Multiple steps form */}
      <Modal.FormWrapper
        classNames={{
          body: 'p-0',
        }}
        footer={
          <Flex align="center" justify="space-between">
            <Button
              className={currentStep === 1 ? 'invisible' : 'visible'}
              onClick={onPrevious}
              size="middle"
            >
              {t('common.button.back')}
            </Button>
            <Flex align="center" gap="0.5rem">
              <Button onClick={onCancel} size="middle">
                {t('common.button.cancel')}
              </Button>
              <Button
                loading={loading}
                onClick={onClickNext}
                size="middle"
                type="primary"
              >
                {t('common.button.next')}
              </Button>
            </Flex>
          </Flex>
        }
        onCancel={onCancel}
        open={openModalMultiple}
        title={t('component.title.modalMultipleStepsForm')}
        width={WIDTH.stepForm}
      >
        <MultipleStepsForm
          direction="vertical"
          firstStepForm={multipleFirstStepForm}
          onFinishFirstStep={onFinishFirstStep}
          onFinishSecondStep={onFinishSecondStep}
          onFinishThirdStep={onFinishThirdStep}
          secondStepForm={multipleSecondStepForm}
          showButton={false}
          thirdStepForm={multipleThirdStepForm}
        />
      </Modal.FormWrapper>

      <Drawer.FormWrapper
        classNames={{
          body: 'pt-10',
        }}
        footer={
          <Flex align="center" justify="space-between">
            <Button
              className={currentStep === 1 ? 'invisible' : 'visible'}
              onClick={onPrevious}
              size="middle"
            >
              {t('common.button.back')}
            </Button>
            <Flex align="center" gap="0.5rem">
              <Button onClick={onCancel} size="middle">
                {t('common.button.cancel')}
              </Button>
              <Button
                loading={loading}
                onClick={onClickNext}
                size="middle"
                type="primary"
              >
                {t('common.button.next')}
              </Button>
            </Flex>
          </Flex>
        }
        onClose={onCancel}
        open={openDrawerMultiple}
        title={t('component.title.drawerMultipleStepsForm')}
        width={WIDTH.form}
      >
        <MultipleStepsForm
          firstStepForm={multipleFirstStepForm}
          onFinishFirstStep={onFinishFirstStep}
          onFinishSecondStep={onFinishSecondStep}
          onFinishThirdStep={onFinishThirdStep}
          secondStepForm={multipleSecondStepForm}
          showButton={false}
          thirdStepForm={multipleThirdStepForm}
        />
      </Drawer.FormWrapper>

      {/* Progress form */}
      <Modal.FormWrapper
        extraHeader={<Progress percent={progress} />}
        okButtonProps={{
          loading,
          onClick: singleStepForm.submit,
        }}
        onCancel={onCancel}
        open={openModalProgress}
        title={t('component.title.modalProgressForm')}
        width={WIDTH.form}
      >
        <SingleStepForm
          form={singleStepForm}
          onFinish={onFinishSingleStep}
          showButton={false}
        />
      </Modal.FormWrapper>

      <Drawer.FormWrapper
        extraHeader={<Progress percent={progress} />}
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
        open={openDrawerProgress}
        title={t('component.title.drawerProgressForm')}
        width={WIDTH.form}
      >
        <SingleStepForm
          form={singleStepForm}
          onFinish={onFinishSingleStep}
          showButton={false}
        />
      </Drawer.FormWrapper>

      {/* Confirm form */}
      <Modal.Confirm
        description={t('component.description.infoConfirmForm')}
        mode="info"
        okButtonProps={{
          loading,
        }}
        okText={t('common.button.ok')}
        onCancel={onCancel}
        onOk={onFinishConfirm}
        open={openInfoConfirmModal}
        title={t('component.title.infoConfirmForm')}
      />
      <Modal.Confirm
        description={t('component.description.warningConfirmForm')}
        mode="warning"
        okButtonProps={{
          loading,
        }}
        okText={t('common.button.continue')}
        onCancel={onCancel}
        onOk={onFinishConfirm}
        open={openWarningConfirmModal}
        title={t('component.title.warningConfirmForm')}
      />
      <Modal.Confirm
        description={t('component.description.errorConfirmForm')}
        mode="error"
        okButtonProps={{
          loading,
        }}
        okText={t('common.button.delete')}
        onCancel={onCancel}
        onOk={onFinishConfirm}
        open={openErrorConfirmModal}
        title={t('component.title.errorConfirmForm')}
      />
      <Modal.Confirm
        description={t('component.description.successConfirmForm')}
        mode="success"
        okButtonProps={{
          loading,
        }}
        okText={t('common.button.ok')}
        onCancel={onCancel}
        onOk={onFinishConfirm}
        open={openSuccessConfirmModal}
        title={t('component.title.successConfirmForm')}
      />
    </>
  );
}

export default SpecialFormPage;
