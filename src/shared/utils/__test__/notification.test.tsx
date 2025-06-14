import { notification, Typography } from 'antd';
import { CloseCircle, TickCircle } from 'iconsax-react';
import { describe, expect, it, vi } from 'vitest';

import { COLOR } from '@/shared/assets/styles/constants';

import { NotiTool } from '../notification';

const { Text } = Typography;
const { showError, showSuccess } = NotiTool;

describe('NotiTool', async () => {
  const notificationErrorSpy = vi.spyOn(notification, 'error');
  const notificationSuccessSpy = vi.spyOn(notification, 'success');

  describe('showError', () => {
    it('should call notification.error with the correct parameters', () => {
      const description = 'This is an error description';
      const message = 'Error occurred';

      showError({ description, message });

      expect(notificationErrorSpy).toHaveBeenCalledWith({
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
    });
  });

  describe('showSuccess', () => {
    it('should call notification.success with the correct parameters', () => {
      const description = 'This is a success description';
      const message = 'Operation successful';

      showSuccess({ description, message });

      expect(notificationSuccessSpy).toHaveBeenCalledWith({
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
    });
  });
});
