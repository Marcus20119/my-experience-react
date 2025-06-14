import { Flex, Form, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { Convertshape2 } from 'iconsax-react';
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
} from '@/app/features/component/form';
import { useFormStore } from '@/app/features/component/form/store';
import { FormLayout } from '@/app/layout';
import { DEFAULT_TIMEOUT } from '@/shared/constants';

enum StepType {
  Multiple = 'multiple',
  Single = 'single',
}

const { Title } = Typography;

function OriginalFormPage() {
  const { t } = useTranslation();
  const [singleStepForm] = Form.useForm<SingleStepFormEntity>();
  const [multipleFirstStepForm] = Form.useForm<MultipleFormFirstStepEntity>();
  const [multipleSecondStepForm] = Form.useForm<MultipleFormSecondStepEntity>();
  const [multipleThirdStepForm] = Form.useForm<MultipleFormThirdStepEntity>();
  const {
    currentStep = 1,
    multipleStepFormValue,
    originalFormType,
    setFormStates,
  } = useFormStore();

  const [loading, setLoading] = useState(false);

  const tabItems: ItemType[] = [
    {
      icon: <Convertshape2 size={16} />,
      key: 'change-form-type',
      label:
        originalFormType === StepType.Single
          ? t('layout.title.multipleStepForm')
          : t('layout.title.singleStepForm'),
      onClick: () => {
        if (originalFormType === StepType.Single) {
          setFormStates({
            originalFormType: StepType.Multiple,
          });
          return;
        }

        if (originalFormType === StepType.Multiple) {
          setFormStates({
            originalFormType: StepType.Single,
          });
          return;
        }
      },
    },
  ];

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
    }, DEFAULT_TIMEOUT);
  };

  return (
    <FormLayout
      route={{
        path: '/component/form/original',
      }}
      tabItems={tabItems}
    >
      <Flex justify="center">
        <div className="w-full max-w-form">
          {originalFormType === StepType.Single ? (
            <Flex align="center" className="w-full" gap="2rem" vertical>
              <Title className="text-xl" level={2}>
                {t('layout.title.singleStepForm')}
              </Title>
              <SingleStepForm form={singleStepForm} />
            </Flex>
          ) : (
            <Flex align="center" className="w-full" gap="2rem" vertical>
              <Title className="text-xl" level={2}>
                {t('layout.title.multipleStepForm')}
              </Title>
              <MultipleStepsForm
                firstStepForm={multipleFirstStepForm}
                loadingFirstStep={loading}
                loadingSecondStep={loading}
                loadingThirdStep={loading}
                onFinishFirstStep={onFinishFirstStep}
                onFinishSecondStep={onFinishSecondStep}
                onFinishThirdStep={onFinishThirdStep}
                onPrevious={onPrevious}
                secondStepForm={multipleSecondStepForm}
                thirdStepForm={multipleThirdStepForm}
              />
            </Flex>
          )}
        </div>
      </Flex>
    </FormLayout>
  );
}

export default OriginalFormPage;
