import { notification, Typography } from 'antd';
import { CloseCircle, InfoCircle, TickCircle, Warning2 } from 'iconsax-react';
import { describe, expect, it, vi } from 'vitest';

import { COLOR } from '@/shared/assets/styles/constants';

import { NotiTool } from '../notification';

const { Text } = Typography;
const { showError, showInfo, showSuccess, showWarning } = NotiTool;

describe('NotiTool', async () => {
  const notificationErrorSpy = vi.spyOn(notification, 'error');
  const notificationSuccessSpy = vi.spyOn(notification, 'success');
  const notificationInfoSpy = vi.spyOn(notification, 'info');
  const notificationWarningSpy = vi.spyOn(notification, 'warning');

  describe('showError', () => {
    it('should call notification.error with the correct parameters', () => {
      const description = 'This is an error description';
      const message = 'Error occurred';

      showError({ description, message });

      expect(notificationErrorSpy).toHaveBeenCalledWith({
        className:
          '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0 [&_.ant-notification-notice-close]:top-[0.875rem] [&_.ant-notification-notice-close]:right-[0.875rem] rounded-xl',
        description,
        icon: (
          <CloseCircle color={COLOR.system.error} size="20" variant="Bold" />
        ),
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
    });
  });

  describe('showSuccess', () => {
    it('should call notification.success with the correct parameters', () => {
      const description = 'This is a success description';
      const message = 'Operation successful';

      showSuccess({ description, message });

      expect(notificationSuccessSpy).toHaveBeenCalledWith({
        className:
          '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0 [&_.ant-notification-notice-close]:top-[0.875rem] [&_.ant-notification-notice-close]:right-[0.875rem] rounded-xl',
        description,
        icon: (
          <TickCircle color={COLOR.system.success} size="20" variant="Bold" />
        ),
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
    });
  });

  describe('showInfo', () => {
    it('should call notification.info with the correct parameters', () => {
      const description = 'This is an info description';
      const message = 'Information received';

      showInfo({ description, message });

      expect(notificationInfoSpy).toHaveBeenCalledWith({
        className:
          '[&_.ant-notification-notice-message]:ml-8 [&_.ant-notification-notice-message]:mb-0 [&_.ant-notification-notice-close]:top-[0.875rem] [&_.ant-notification-notice-close]:right-[0.875rem] rounded-xl',
        description,
        icon: (
          <InfoCircle
            color={COLOR.system.information}
            size="20"
            variant="Bold"
          />
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
    });
  });

  describe('showWarning', () => {
    it('should call notification.warning with the correct parameters', () => {
      const description = 'This is a warning description';
      const message = 'Warning received';

      showWarning({ description, message });

      expect(notificationWarningSpy).toHaveBeenCalledWith({
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
    });
  });
});
