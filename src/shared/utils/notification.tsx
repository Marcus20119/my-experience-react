import { notification, Typography } from 'antd';
import { CloseCircle, InfoCircle, TickCircle, Warning2 } from 'iconsax-react';

import { COLOR } from '../assets/styles/constants';

const { Text } = Typography;

const showError = ({
  description,
  message,
}: {
  description?: string;
  message: string;
}) =>
  notification.error({
    className:
      '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0 [&_.ant-notification-notice-close]:top-[0.875rem] [&_.ant-notification-notice-close]:right-[0.875rem] rounded-xl',
    description,
    icon: <CloseCircle color={COLOR.system.error} size="20" variant="Bold" />,
    message: (
      <Text className="block -translate-y-[0.125rem] font-semibold">
        {message}
      </Text>
    ),
    style: {
      backgroundColor: COLOR.system.errorSoft,
      border: `1px solid ${COLOR.system.error}33`,
      borderRadius: '0.75rem',
      padding: '0.875rem',
    },
  });

const showSuccess = ({
  description,
  message,
}: {
  description?: string;
  message: string;
}) =>
  notification.success({
    className:
      '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0 [&_.ant-notification-notice-close]:top-[0.875rem] [&_.ant-notification-notice-close]:right-[0.875rem] rounded-xl',
    description,
    icon: <TickCircle color={COLOR.system.success} size="20" variant="Bold" />,
    message: (
      <Text className="block -translate-y-[0.125rem] font-semibold">
        {message}
      </Text>
    ),
    style: {
      backgroundColor: COLOR.system.successSoft,
      border: `1px solid ${COLOR.system.success}33`,
      borderRadius: '0.75rem',
      padding: '0.875rem',
    },
  });

const showInfo = ({
  description,
  message,
}: {
  description?: string;
  message: string;
}) =>
  notification.info({
    className:
      '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0 [&_.ant-notification-notice-close]:top-[0.875rem] [&_.ant-notification-notice-close]:right-[0.875rem] rounded-xl',
    description,
    icon: (
      <InfoCircle color={COLOR.system.information} size="20" variant="Bold" />
    ),
    message: (
      <Text className="block -translate-y-[0.125rem] font-semibold">
        {message}
      </Text>
    ),
    style: {
      backgroundColor: COLOR.system.informationSoft,
      border: `1px solid ${COLOR.system.information}33`,
      borderRadius: '0.75rem',
      padding: '0.875rem',
    },
  });

const showWarning = ({
  description,
  message,
}: {
  description?: string;
  message: string;
}) =>
  notification.warning({
    className:
      '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0 [&_.ant-notification-notice-close]:top-[0.875rem] [&_.ant-notification-notice-close]:right-[0.875rem] rounded-xl',
    description,
    icon: <Warning2 color={COLOR.system.alert} size="20" variant="Bold" />,
    message: (
      <Text className="block -translate-y-[0.125rem] font-semibold">
        {message}
      </Text>
    ),
    style: {
      backgroundColor: COLOR.system.alertSoft,
      border: `1px solid ${COLOR.system.alert}33`,
      borderRadius: '0.75rem',
      padding: '0.875rem',
    },
  });

export const NotiTool = {
  showError,
  showInfo,
  showSuccess,
  showWarning,
};
