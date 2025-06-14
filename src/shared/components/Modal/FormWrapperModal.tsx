import { ConfigProvider, Flex, Modal, Typography } from 'antd';
import type { ModalProps } from 'antd/lib';
import { useTranslation } from 'react-i18next';

import { COLOR, Z_INDEX } from '@/shared/assets/styles/constants';

const { Text, Title } = Typography;

export interface FormModalWrapperProps
  extends Omit<ModalProps, 'loading' | 'title'> {
  extraHeader?: React.ReactNode;
  subTitle?: string;
  title?: string;
}

function FormWrapperModal({
  cancelButtonProps,
  children,
  extraHeader,
  okButtonProps,
  styles,
  subTitle,
  title,
  ...props
}: FormModalWrapperProps) {
  const { t } = useTranslation();

  return (
    <ConfigProvider
      theme={{
        token: {
          zIndexPopupBase: Number(Z_INDEX.popupSelectModal),
        },
      }}
    >
      <Modal
        cancelText={t('common.button.cancel')}
        centered
        destroyOnClose
        maskClosable={false}
        okText={t('common.button.save')}
        {...props}
        cancelButtonProps={{
          size: 'middle',
          ...cancelButtonProps,
        }}
        okButtonProps={{
          size: 'middle',
          ...okButtonProps,
        }}
        styles={{
          ...styles,
          body: {
            maxHeight: 'calc(100vh - 200px)',
            overflowY: 'auto',
            padding: '1rem 0.75rem',
            scrollbarGutter: 'stable both-edges',
            ...styles?.body,
          },
          content: {
            padding: 0,
            ...styles?.content,
          },
          footer: {
            borderTopColor: COLOR.neutral['300'],
            borderTopStyle: 'solid',
            borderTopWidth: 1,
            marginTop: 0,
            padding: '1rem 1.25rem',
            ...styles?.footer,
          },
          header: {
            borderBottomColor: COLOR.neutral['300'],
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            marginBottom: 0,
            padding: subTitle ? '0.75rem 1.25rem' : '1rem 1.25rem',
            ...styles?.header,
          },
        }}
        title={
          <Flex gap="0.25rem" vertical>
            <Flex align="center" className="w-[90%]" gap="0.75rem">
              <Title className="flex-shrink-0" level={2}>
                {title}
              </Title>
              {extraHeader}
            </Flex>
            {subTitle ? (
              <Text className="text-sm text-gray-500">{subTitle}</Text>
            ) : null}
          </Flex>
        }
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
}

export default FormWrapperModal;
