import { useQuery } from '@tanstack/react-query';
import { Flex } from 'antd';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Header } from '@/app/features/header';
import { Sidebar, useSidebarStore } from '@/app/features/sidebar';
import { useAppRouter } from '@/shared/hooks';
import { useLocalStore } from '@/shared/stores';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';

import { ContentLayout } from './content-layout';

function RootLayout() {
  const { navigate } = useAppRouter();
  const { prevRoute } = useLocalStore();
  const { pathname } = useLocation();
  const {
    getSidebarWidth,
    removeSidebarStates,
    setSidebarStates,
    technologySkeleton,
  } = useSidebarStore();

  useEffect(() => {
    if (pathname === '/') {
      if (prevRoute) {
        navigate(prevRoute);
      } else {
        navigate({
          param: { type: 'frontend' },
          path: '/technology-type/:type',
        });
      }
    }
  }, [pathname]);

  const { data, isFetched, isRefetching } = useQuery(
    technologySectionQueries.skeleton(),
  );

  useEffect(() => {
    if (isFetched) {
      setSidebarStates({ technologySkeleton: data?.technologySkeleton });

      if (
        JSON.stringify(data?.technologySkeleton) !==
        JSON.stringify(technologySkeleton)
      ) {
        removeSidebarStates(['mainSidebarHistory', 'subSidebarHistory']);
      }
    }
  }, [isFetched, isRefetching]);

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
