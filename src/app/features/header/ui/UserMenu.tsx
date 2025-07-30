import type { NavigateOptions } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { Dropdown, Flex, Image, Typography } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { DirectNormal, Medal, Setting2, User } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { useSidebarStore } from '@/app/features/sidebar';

const { Text } = Typography;

interface UserMenuItem extends Omit<MenuItemType, 'onClick'> {
  navigateOptions?: NavigateOptions;
}

function UserMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setSidebarStates } = useSidebarStore();

  const userItems: UserMenuItem[] = [
    {
      icon: <User size="20" />,
      key: 'aboutMe',
      label: t('layout.title.aboutMe'),
    },
    {
      icon: <Medal size="20" />,
      key: 'certificate',
      label: t('layout.title.myCertificates'),
    },
    {
      icon: <DirectNormal size="20" />,
      key: 'project',
      label: t('layout.title.myProjects'),
    },
    {
      icon: <Setting2 size="20" />,
      key: 'settings',
      label: t('layout.title.settings'),
      navigateOptions: {
        to: '/settings',
      },
    },
  ];

  const menuItems: MenuItemType[] = userItems.map(item => ({
    ...item,
    onClick: () => {
      if (item.navigateOptions) {
        navigate(item.navigateOptions);
        setSidebarStates({
          isSubBarCollapsed: true,
        });
      }
    },
  }));

  return (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      overlayStyle={{
        width: '12rem',
      }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Flex
        align="center"
        className="cursor-pointer rounded-full bg-neutral-200 py-1 pl-5 pr-1"
        gap="0.5rem"
      >
        <Text className="font-bold">Marcus Nguyen</Text>
        <Image
          className="rounded-full object-cover"
          height="2rem"
          preview={false}
          src="/images/avatar.jpg"
          width="2rem"
        />
      </Flex>
    </Dropdown>
  );
}

export default UserMenu;
