import { ConfigProvider, Flex, Input } from 'antd';
import { SearchNormal1 } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { Z_INDEX } from '@/shared/assets/styles/constants';

import UserMenu from './UserMenu';

function Header() {
  const { t } = useTranslation();

  return (
    <Flex
      align="center"
      className="sticky right-0 top-0 z-headerMain h-headerMain w-full border-0 border-b border-solid border-neutral-200 bg-neutral-0 pl-6 pr-4"
      justify="space-between"
    >
      <ConfigProvider
        theme={{
          token: {
            zIndexPopupBase: Number(Z_INDEX.popupHeader),
          },
        }}
      >
        <Input
          className="max-w-52 flex-1"
          placeholder={t('common.placeholder.quickSearch')}
          prefix={<SearchNormal1 size="16" />}
          size="small"
        />
        <UserMenu />
      </ConfigProvider>
    </Flex>
  );
}

export default Header;
