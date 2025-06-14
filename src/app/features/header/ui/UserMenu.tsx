import { Dropdown, Flex, Image, Typography } from 'antd';
import type { MenuItemType } from 'antd/es/menu/interface';
import { DirectNormal, Medal, Setting2, User } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { useSidebarStore } from '@/app/features/sidebar';
import type { RouterNavigator } from '@/shared/hooks';
import { useAppRouter } from '@/shared/hooks';

const { Text } = Typography;

interface UserMenuItem extends Omit<MenuItemType, 'onClick'> {
  route?: RouterNavigator;
}

function UserMenu() {
  const { t } = useTranslation();
  const { navigate } = useAppRouter();
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
      route: {
        path: '/settings',
      },
    },
  ];

  const menuItems: MenuItemType[] = userItems.map(item => ({
    ...item,
    onClick: () => {
      if (item.route) {
        navigate(item.route);
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
