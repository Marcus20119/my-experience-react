import { Flex } from 'antd';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/app/features/header';
import { Sidebar, useSidebarStore } from '@/app/features/sidebar';
import { useAppRouter } from '@/shared/hooks';
import { useLocalStore } from '@/shared/stores';

import { ContentLayout } from './content-layout';

function RootLayout() {
  const { navigate } = useAppRouter();
  const { prevRoute } = useLocalStore();
  const { pathname } = useLocation();
  const { getSidebarWidth } = useSidebarStore();

  useEffect(() => {
    if (pathname === '/') {
      if (prevRoute) {
        navigate(prevRoute);
      } else {
        navigate({
          path: '/technology/configuration',
        });
      }
    }
  }, [pathname]);

  return (
    <Suspense
      fallback={
        <Flex className="min-h-screen">
          <Sidebar />

          <Flex
            className="transition-all duration-300"
            style={{
              width: `calc(100% - ${getSidebarWidth()}px)`,
            }}
            vertical
          >
            <Header />
            <ContentLayout.Loading />
          </Flex>
        </Flex>
      }
    >
      <Outlet />
    </Suspense>
  );
}

export default RootLayout;
