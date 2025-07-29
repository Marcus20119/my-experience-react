import { Icon } from '@iconify/react/dist/iconify.js';
import { Flex, Typography } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { COLOR } from '@/shared/assets/styles/constants';

import { StyledToastMessage } from './styles';
import { ToastMessageType } from './toast-message.enums';
import type {
  ToastMessageProps,
  ToastMessageRef,
} from './toast-message.interfaces';
import ToastMessageIcon from './ToastMessageIcon';

const { Paragraph } = Typography;

interface Props {
  zIndex?: number;
}

function ToastMessage({ zIndex }: Props, ref: React.Ref<ToastMessageRef>) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [toast, setToast] = useState<null | ToastMessageProps>(null);
  const [type, setType] = useState<ToastMessageType>(ToastMessageType.Success);

  const showToast = (props: ToastMessageProps) => {
    setToast(null);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const timer = setTimeout(() => {
      setToast(props);
      timerRef.current = setTimeout(() => setToast(null), 3000);
      clearTimeout(timer);
    }, 0);
  };

  useImperativeHandle(
    ref,
    (): ToastMessageRef => ({
      showError: props => {
        setType(ToastMessageType.Error);
        showToast(props);
      },
      showInfo: props => {
        setType(ToastMessageType.Info);
        showToast(props);
      },
      showSuccess: props => {
        setType(ToastMessageType.Success);
        showToast(props);
      },
      showWarning: props => {
        setType(ToastMessageType.Warning);
        showToast(props);
      },
    }),
  );

  const onClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast(null);
  };

  const softColor = {
    [ToastMessageType.Error]: COLOR.system.errorSoft,
    [ToastMessageType.Info]: COLOR.system.informationSoft,
    [ToastMessageType.Success]: COLOR.system.successSoft,
    [ToastMessageType.Warning]: COLOR.system.alertSoft,
  };

  const mainColor = {
    [ToastMessageType.Error]: COLOR.system.error,
    [ToastMessageType.Info]: COLOR.system.information,
    [ToastMessageType.Success]: COLOR.system.success,
    [ToastMessageType.Warning]: COLOR.system.alert,
  };

  if (!toast) return null;

  return (
    <div
      className="absolute right-2 top-2 h-[6.25rem] w-[25rem] overflow-hidden"
      style={{
        zIndex: toast?.zIndex || zIndex,
      }}
    >
      <StyledToastMessage>
        <Flex
          align="start"
          className="w-[25rem] rounded-lg border border-solid p-3.5"
          gap="0.5rem"
          justify="space-between"
          style={{
            backgroundColor: softColor[type],
            borderColor: `${mainColor[type]}33`,
          }}
        >
          <Flex align="start" gap="0.5rem">
            <ToastMessageIcon type={type} />
            <Flex gap="0.25rem" vertical>
              {toast?.message ? (
                <Paragraph
                  className="m-0 text-base font-semibold leading-5"
                  ellipsis={{
                    rows: 2,
                    tooltip: true,
                  }}
                >
                  {toast?.message}
                </Paragraph>
              ) : null}
              {toast?.description ? (
                <Paragraph
                  className="text-neutral-550 m-0 text-base leading-5"
                  ellipsis={{
                    rows: 2,
                    tooltip: true,
                  }}
                >
                  {toast?.description}
                </Paragraph>
              ) : null}
            </Flex>
          </Flex>

          <Icon
            className="flex-shrink-0 cursor-pointer hover:opacity-80"
            color={COLOR.system.disable}
            height="20"
            icon="ic:round-close"
            onClick={onClose}
            width="20"
          />
        </Flex>
      </StyledToastMessage>
    </div>
  );
}

export default forwardRef(ToastMessage);
