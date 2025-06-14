import { notification, Typography } from 'antd';
import { CloseCircle, TickCircle } from 'iconsax-react';

import { COLOR } from '../assets/styles/constants';

const { Text } = Typography;

const showError = ({
  description,
  message,
}: {
  description?: string;
  message?: string;
}) => {
  notification.error({
    className:
      '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0',
    closable: false,
    description: <Text className="text-neutral-0">{description}</Text>,
    duration: 3,
    icon: <CloseCircle color={COLOR.neutral['0']} size="24" />,
    message: <Text className="text-base text-neutral-0">{message}</Text>,
    placement: 'topRight',
    style: {
      backgroundColor: COLOR.system.error,
      borderRadius: '0.5rem',
      minWidth: '27.75rem',
      padding: '0.75rem',
    },
  });
};

const showSuccess = ({
  description,
  message,
}: {
  description?: string;
  message?: string;
}) => {
  notification.success({
    className:
      '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0',
    closable: false,
    description: <Text className="text-neutral-0">{description}</Text>,
    duration: 3,
    icon: <TickCircle color={COLOR.neutral['0']} size="24" />,
    message: <Text className="text-base text-neutral-0">{message}</Text>,
    placement: 'topRight',
    style: {
      backgroundColor: COLOR.system.success,
      borderRadius: '0.5rem',
      minWidth: '27.75rem',
      padding: '0.75rem',
    },
  });
};

export const NotiTool = {
  showError,
  showSuccess,
};
