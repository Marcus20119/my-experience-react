import { Modal as AntModal } from 'antd';
import type { ModalProps } from 'antd/lib';

import CalendarItemModal from './CalendarItemModal';
import ConfirmModal from './ConfirmModal';
import FormWrapperModal from './FormWrapperModal';

function Modal({ children, ...props }: ModalProps) {
  return <AntModal {...props}>{children}</AntModal>;
}

Modal.FormWrapper = FormWrapperModal;
Modal.Confirm = ConfirmModal;
Modal.CalendarItem = CalendarItemModal;

export { Modal };
