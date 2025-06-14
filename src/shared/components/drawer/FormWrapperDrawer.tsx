import { ConfigProvider, Drawer, Flex, Typography } from 'antd';
import type { DrawerProps } from 'antd/lib';

import { cn } from '@/lib/tailwind';
import { COLOR, Z_INDEX } from '@/shared/assets/styles/constants';

const { Text, Title } = Typography;

interface Props extends Omit<DrawerProps, 'title'> {
  extraHeader?: React.ReactNode;
  subTitle?: string;
  title?: string;
}

function FormWrapperDrawer({
  children,
  classNames,
  extraHeader,
  styles,
  subTitle,
  title,
  ...props
}: Props) {
  return (
    <ConfigProvider
      theme={{
        token: {
          zIndexPopupBase: Number(Z_INDEX.popupSelectModal),
        },
      }}
    >
      <Drawer
        destroyOnClose
        maskClosable={false}
        {...props}
        classNames={{
          ...classNames,
          header: cn(
            '[&_.ant-drawer-close]:order-[10] [&_.ant-drawer-close]:m-0 [&_.ant-drawer-close]:w-8 [&_.ant-drawer-close]:h-8',
            classNames?.header,
          ),
        }}
        styles={{
          ...styles,
          body: {
            overflowY: 'auto',
            padding: '1rem 1rem',
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
            padding: '1rem 1.5rem',
            ...styles?.footer,
          },
          header: {
            borderBottomColor: COLOR.neutral['300'],
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            marginBottom: 0,
            padding: subTitle ? '0.75rem 1.5rem' : '1rem 1.5rem',
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
      </Drawer>
    </ConfigProvider>
  );
}

export default FormWrapperDrawer;
