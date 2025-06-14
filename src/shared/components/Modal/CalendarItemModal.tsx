import type { ModalProps } from 'antd';
import { Modal } from 'antd';

import { COLOR } from '@/shared/assets/styles/constants';
import { ThemeTool } from '@/shared/utils';

interface Props extends Pick<ModalProps, 'onCancel' | 'open' | 'title'> {
  children?: React.ReactNode;
  color?: string;
}

function CalendarItemModal({ children, color, ...props }: Props) {
  return (
    <Modal
      centered
      footer={null}
      styles={{
        body: {
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          padding: '1rem 0.75rem',
          scrollbarGutter: 'stable both-edges',
        },
        content: {
          backgroundColor: color
            ? `${ThemeTool.getHexColorVariant(color, 0.7)}`
            : COLOR.neutral['0'],
          padding: 0,
        },
        header: {
          backgroundColor: color
            ? `${ThemeTool.getHexColorVariant(color, 0.9)}`
            : COLOR.neutral['0'],
          marginBottom: 0,
          padding: '1rem 1.25rem',
        },
      }}
      width={360}
      {...props}
    >
      {children}
    </Modal>
  );
}

export default CalendarItemModal;
