import { InfoCircle, TickCircle, Warning2 } from 'iconsax-react';

import { COLOR } from '@/shared/assets/styles/constants';

import { ToastMessageType } from './toast-message.enums';

interface Props {
  type?: null | ToastMessageType;
}

function ToastMessageIcon({ type }: Props) {
  switch (type) {
    case ToastMessageType.Success:
      return (
        <TickCircle
          className="flex-shrink-0"
          color={COLOR.system.success}
          size="20"
          variant="Bold"
        />
      );
    case ToastMessageType.Error:
      return (
        <InfoCircle
          className="flex-shrink-0"
          color={COLOR.system.error}
          size="20"
          variant="Bold"
        />
      );
    case ToastMessageType.Warning:
      return (
        <Warning2
          className="flex-shrink-0"
          color={COLOR.system.alert}
          size="20"
          variant="Bold"
        />
      );
    case ToastMessageType.Info:
      return (
        <InfoCircle
          className="flex-shrink-0"
          color={COLOR.system.information}
          size="20"
          variant="Bold"
        />
      );
    default:
      return null;
  }
}

export default ToastMessageIcon;
