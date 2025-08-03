import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { Flex } from 'antd';
import { Suspense, useEffect } from 'react';

import { Header } from '@/app/features/header';
import { Sidebar, useSidebarStore } from '@/app/features/sidebar';
import { useLocalStore } from '@/shared/stores';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';

import { ContentLayout } from './content-layout';
import MainLayout from './MainLayout';

function RootLayout() {
  const navigate = useNavigate();
  const { prevNavigateOptions } = useLocalStore();
  const { pathname } = useLocation();
  const {
    getSidebarWidth,
    removeSidebarStates,
    setSidebarStates,
    technologySkeleton,
  } = useSidebarStore();

  useEffect(() => {
    if (pathname === '/') {
      if (prevNavigateOptions) {
        navigate(prevNavigateOptions);
      } else {
        navigate({
          to: '/component/calendar/monthly',
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
      <MainLayout />
    </Suspense>
  );
}

export default RootLayout;
