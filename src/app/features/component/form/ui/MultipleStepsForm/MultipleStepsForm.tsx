import { Flex, type FormInstance, Steps } from 'antd';

import type {
  MultipleFormFirstStepEntity,
  MultipleFormSecondStepEntity,
  MultipleFormThirdStepEntity,
} from '@/app/features/component/form';
import { useFormStore } from '@/app/features/component/form';
import { cn } from '@/lib/tailwind';

import FirstStepForm from './FirstStepForm';
import SecondStepForm from './SecondStepForm';
import ThirdStepForm from './ThirdStepForm';

interface Props {
  direction?: 'horizontal' | 'vertical';
  firstStepForm: FormInstance<MultipleFormFirstStepEntity>;
  loadingFirstStep?: boolean;
  loadingSecondStep?: boolean;
  loadingThirdStep?: boolean;
  onFinishFirstStep?: (values: MultipleFormFirstStepEntity) => void;
  onFinishSecondStep?: (values: MultipleFormSecondStepEntity) => void;
  onFinishThirdStep?: (values: MultipleFormThirdStepEntity) => void;
  onPrevious?: () => void;
  secondStepForm: FormInstance<MultipleFormSecondStepEntity>;
  showButton?: boolean;
  thirdStepForm: FormInstance<MultipleFormThirdStepEntity>;
}

function MultipleStepsForm({
  direction = 'horizontal',
  firstStepForm,
  loadingFirstStep,
  loadingSecondStep,
  loadingThirdStep,
  onFinishFirstStep,
  onFinishSecondStep,
  onFinishThirdStep,
  onPrevious,
  secondStepForm,
  showButton = true,
  thirdStepForm,
}: Props) {
  const { currentStep = 1 } = useFormStore();

  return (
    <Flex
      align={direction === 'horizontal' ? 'center' : 'start'}
      className="w-full"
      gap={direction === 'horizontal' ? '4rem' : '1rem'}
      vertical={direction === 'horizontal'}
    >
      <Steps
        className={cn(
          direction === 'horizontal'
            ? 'w-5/6'
            : 'sticky left-0 top-0 w-fit pl-3 pt-4',
        )}
        current={currentStep - 1}
        direction={direction}
        items={[
          {
            title: 'Basic Info',
          },
          {
            title: 'Employment',
          },
          {
            title: 'Education Info',
          },
        ]}
      />

      <Flex
        className={cn(
          direction === 'horizontal'
            ? ''
            : 'border-0 border-l border-solid border-gray-200 bg-neutral-50 py-4 pl-4 pr-3',
        )}
        flex={1}
      >
        {currentStep === 1 && (
          <FirstStepForm
            form={firstStepForm}
            loading={loadingFirstStep}
            onFinish={onFinishFirstStep}
            showButton={showButton}
          />
        )}

        {currentStep === 2 && (
          <SecondStepForm
            form={secondStepForm}
            loading={loadingSecondStep}
            onBack={onPrevious}
            onFinish={onFinishSecondStep}
            showButton={showButton}
          />
        )}

        {currentStep === 3 && (
          <ThirdStepForm
            form={thirdStepForm}
            loading={loadingThirdStep}
            onBack={onPrevious}
            onFinish={onFinishThirdStep}
            showButton={showButton}
          />
        )}
      </Flex>
    </Flex>
  );
}

export default MultipleStepsForm;
