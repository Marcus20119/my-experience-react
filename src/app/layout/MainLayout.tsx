import { Dropdown, Flex, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { Add, ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'iconsax-react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { Z_INDEX } from '@/shared/assets/styles/constants';
import { useKeyDown, useMatchRoutes } from '@/shared/hooks';

import { Header, useHeaderStore } from '../features/header';
import { Sidebar, useSidebarStore } from '../features/sidebar';

const { Text } = Typography;

function MainLayout() {
  const { t } = useTranslation();
  const { getSidebarWidth, isSubBarCollapsed, setSidebarStates } =
    useSidebarStore();
  const { isContentHeaderCollapsed, isContentHeaderSticky, setHeaderStates } =
    useHeaderStore();

  const sidebarWidth = getSidebarWidth();
  const disabledSidebarActions = useMatchRoutes(['/settings']);

  useKeyDown({
    keys: ['Control', 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft'],
    onKeyPress: keys => {
      if (keys.includes('Control') && keys.includes('ArrowDown')) {
        setHeaderStates({
          isContentHeaderCollapsed: false,
        });
      }

      if (keys.includes('Control') && keys.includes('ArrowUp')) {
        setHeaderStates({
          isContentHeaderCollapsed: true,
        });
      }

      if (
        keys.includes('Control') &&
        keys.includes('ArrowRight') &&
        !disabledSidebarActions
      ) {
        setSidebarStates({
          isSubBarCollapsed: false,
        });
      }

      if (
        keys.includes('Control') &&
        keys.includes('ArrowLeft') &&
        !disabledSidebarActions
      ) {
        setSidebarStates({
          isSubBarCollapsed: true,
        });
      }
    },
    updateDependencies: [disabledSidebarActions],
  });

  const contextHeaderMenuItems: ItemType[] = [
    {
      key: 'sticky',
      label: isContentHeaderSticky ? 'Unstick header' : 'Stick header',
      onClick: () =>
        setHeaderStates({
          isContentHeaderSticky: !isContentHeaderSticky,
        }),
    },
    {
      key: 'header-collapse',
      label: (
        <Flex align="center" gap="2rem" justify="space-between">
          <Text>
            {isContentHeaderCollapsed
              ? t('layout.action.expandHeader')
              : t('layout.action.collapseHeader')}
          </Text>

          <Flex align="center" className="w-fit text-neutral-500" gap="0.25rem">
            Ctrl
            <Add size="16" />
            {isContentHeaderCollapsed ? (
              <ArrowDown size="16" />
            ) : (
              <ArrowUp size="16" />
            )}
          </Flex>
        </Flex>
      ),
      onClick: () =>
        setHeaderStates({
          isContentHeaderCollapsed: !isContentHeaderCollapsed,
        }),
    },
    {
      disabled: disabledSidebarActions,
      key: 'sidebar-collapse',
      label: (
        <Flex align="center" gap="2rem" justify="space-between">
          <Text>
            {isSubBarCollapsed
              ? t('layout.action.expandSidebar')
              : t('layout.action.collapseSidebar')}
          </Text>

          <Flex align="center" className="w-fit text-neutral-500" gap="0.25rem">
            Ctrl
            <Add size="16" />
            {isSubBarCollapsed ? (
              <ArrowRight size="16" />
            ) : (
              <ArrowLeft size="16" />
            )}
          </Flex>
        </Flex>
      ),
      onClick: () =>
        setSidebarStates({
          isSubBarCollapsed: !isSubBarCollapsed,
        }),
    },
  ];

  return (
    <Dropdown
      menu={{ items: contextHeaderMenuItems }}
      overlayStyle={{
        zIndex: Number(Z_INDEX.contextMenuPopup),
      }}
      trigger={['contextMenu']}
    >
      <Flex className="min-h-screen">
        <Sidebar />

        <Flex
          className="transition-all duration-300"
          style={{
            width: `calc(100% - ${sidebarWidth}px)`,
          }}
          vertical
        >
          <Header />
          <Outlet />
        </Flex>
      </Flex>
    </Dropdown>
  );
}

export default MainLayout;
