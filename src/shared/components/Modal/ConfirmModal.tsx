import { Flex, Typography } from 'antd';
import { CloseCircle, InfoCircle, TickCircle, Warning2 } from 'iconsax-react';
import { useMemo } from 'react';

import { COLOR, WIDTH } from '@/shared/assets/styles/constants';

import type { FormModalWrapperProps } from './FormWrapperModal';
import FormWrapperModal from './FormWrapperModal';

const { Text } = Typography;

interface Props extends FormModalWrapperProps {
  description: string;
  mode: 'error' | 'info' | 'success' | 'warning';
}

function ConfirmModal({
  description,
  mode,
  okButtonProps,
  styles,
  ...props
}: Props) {
  const icon = useMemo(() => {
    if (mode === 'info') {
      return (
        <Flex
          align="center"
          className="h-12 w-12 rounded-xl bg-system-informationSoft"
          justify="center"
        >
          <InfoCircle
            color={COLOR.system.information}
            size="24"
            variant="Bold"
          />
        </Flex>
      );
    }

    if (mode === 'warning') {
      return (
        <Flex
          align="center"
          className="h-12 w-12 rounded-xl bg-system-alertSoft"
          justify="center"
        >
          <Warning2 color={COLOR.system.alert} size="24" variant="Bold" />
        </Flex>
      );
    }

    if (mode === 'error') {
      return (
        <Flex
          align="center"
          className="h-12 w-12 rounded-xl bg-system-errorSoft"
          justify="center"
        >
          <CloseCircle color={COLOR.system.error} size="24" variant="Bold" />
        </Flex>
      );
    }

    return (
      <Flex
        align="center"
        className="h-12 w-12 rounded-xl bg-system-successSoft"
        justify="center"
      >
        <TickCircle color={COLOR.system.success} size="24" variant="Bold" />
      </Flex>
    );
  }, [mode]);

  return (
    <FormWrapperModal
      width={WIDTH.confirmModal}
      {...props}
      okButtonProps={{
        danger: mode === 'error',
        ...okButtonProps,
        style: {
          color: mode === 'error' ? COLOR.neutral['0'] : undefined,
          ...okButtonProps?.style,
        },
      }}
      styles={{
        ...styles,
        body: {
          padding: '1rem 0.5rem',
          ...styles?.body,
        },
        header: {
          display: 'none',
          ...styles?.header,
        },
      }}
    >
      <Flex align="center" gap="0.75rem">
        {icon}
        <Flex vertical>
          <Text className="text-lg font-semibold">{props.title}</Text>
          <Text className="text-sm text-neutral-600">{description}</Text>
        </Flex>
      </Flex>
    </FormWrapperModal>
  );
}

export default ConfirmModal;
