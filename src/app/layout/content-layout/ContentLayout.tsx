import { Breadcrumb, Dropdown, Flex, Tabs, Typography } from 'antd';
import type { BreadcrumbProps } from 'antd/lib';
import { ArrowDown2, ArrowRight2, ArrowUp2 } from 'iconsax-react';
import { useLocation } from 'react-router-dom';

import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { useHeaderStore } from '@/app/features/header';
import { useGetSidebarData, useSidebarStore } from '@/app/features/sidebar';
import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { useAppRouter } from '@/shared/hooks';

import ContentLayoutLoading from './ContentLayoutLoading';

const { Text, Title } = Typography;

interface Props {
  breadCrumb?: BreadcrumbItem[];
  children: React.ReactNode;
  contentNoPadding?: boolean;
  onChangeTab?: (path: RouterPath) => void;
  tabs?: HeaderTabItem[];
  title: string;
}

function ContentLayout({
  breadCrumb,
  children,
  contentNoPadding,
  onChangeTab,
  tabs,
  title,
}: Props) {
  const { navigate } = useAppRouter();
  const { pathname } = useLocation();
  const { isContentHeaderCollapsed, isContentHeaderSticky, setHeaderStates } =
    useHeaderStore();
  const { activeSubKey } = useGetSidebarData();
  const { setSubSidebarHistory } = useSidebarStore();

  const formattedBreadCrumb: BreadcrumbProps['items'] = breadCrumb?.map(
    ({ onClick, route, title }) => ({
      onClick: () => {
        onClick?.();
        route && navigate(route);
      },
      title: (
        <Text
          className={cn(
            'font-medium',
            onClick || route
              ? 'cursor-pointer text-neutral-500 hover:text-primary'
              : 'cursor-default',
          )}
        >
          {title}
        </Text>
      ),
    }),
  );

  return (
    <Flex className="flex-1" vertical>
      <div
        className={cn(
          'z-headerContent',
          isContentHeaderSticky ? 'sticky left-0 top-[3.5rem]' : 'relative',
        )}
      >
        <Flex
          align="top"
          className={cn(
            'box-border w-full overflow-hidden border-neutral-200 bg-neutral-0 px-4 transition-all duration-300',
            isContentHeaderCollapsed
              ? 'h-0 max-h-0 overflow-hidden'
              : 'h-headerContent max-h-20 border-0 border-b border-solid',
          )}
          justify="space-between"
        >
          <Flex
            className="w-fit flex-shrink-0 py-3"
            gap="0.375rem"
            justify="space-between"
            vertical
          >
            {breadCrumb ? (
              <Breadcrumb
                items={formattedBreadCrumb}
                separator={
                  <ArrowRight2
                    className="translate-y-0.5"
                    color={COLOR.neutral['500']}
                    size="16"
                  />
                }
              />
            ) : null}
            <Title>{title}</Title>
          </Flex>

          <Flex align="end" className="h-full flex-1">
            {tabs?.length ? (
              <Tabs
                className="w-full [&_.ant-tabs-nav-wrap]:justify-end [&_.ant-tabs-nav]:m-0"
                defaultActiveKey={pathname}
                items={tabs.map(tab => ({
                  key: tab.route.path as string,
                  label: tab.menuItems ? (
                    <Dropdown
                      menu={{
                        items: tab.menuItems,
                      }}
                      open={pathname === tab.route.path ? undefined : false}
                      placement="bottom"
                      trigger={['hover', 'click']}
                    >
                      <Flex align="center" gap="0.5rem">
                        <Text className="whitespace-nowrap">{tab.label}</Text>
                        {pathname === tab.route.path ? (
                          <ArrowDown2 size="16" />
                        ) : null}
                      </Flex>
                    </Dropdown>
                  ) : (
                    <Text className="whitespace-nowrap">{tab.label}</Text>
                  ),
                }))}
                more={{
                  visible: false,
                }}
                onChange={path => {
                  navigate({
                    path: path as '/404', // TEMP: Supposed to be RouterPath
                  });
                  onChangeTab?.(path as RouterPath);

                  if (activeSubKey) {
                    setSubSidebarHistory(activeSubKey, {
                      path: path as '/404',
                    });
                  }
                }}
                rootClassName="hide-underline"
                size="small"
                type="card"
              />
            ) : null}
          </Flex>
        </Flex>

        <Flex
          align="center"
          className={cn(
            'absolute right-0 top-0 h-6 w-7 cursor-pointer rounded-b-md bg-neutral-100 transition-all duration-300 hover:bg-neutral-50',
            isContentHeaderCollapsed ? 'shadow-md' : 'shadow-none',
          )}
          justify="center"
          onClick={() =>
            setHeaderStates({
              isContentHeaderCollapsed: !isContentHeaderCollapsed,
            })
          }
        >
          {isContentHeaderCollapsed ? (
            <ArrowDown2 size="20" />
          ) : (
            <ArrowUp2 size="20" />
          )}
        </Flex>
      </div>
      <div
        className={cn(
          'flex-1 overflow-hidden',
          contentNoPadding ? '' : 'p-contentPadding',
        )}
      >
        {children}
      </div>
    </Flex>
  );
}

ContentLayout.Loading = ContentLayoutLoading;

export default ContentLayout;
