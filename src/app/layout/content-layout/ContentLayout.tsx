import { Icon } from '@iconify/react/dist/iconify.js';
import type { NavigateOptions } from '@tanstack/react-router';
import { useMatchRoute, useNavigate } from '@tanstack/react-router';
import { Breadcrumb, Button, Dropdown, Flex, Tabs, Typography } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { BreadcrumbProps } from 'antd/lib';
import { ArrowDown2, ArrowRight2, ArrowUp2 } from 'iconsax-react';

import type { BreadcrumbItem, HeaderTabItem } from '@/app/features/header';
import { useHeaderStore } from '@/app/features/header';
import { useGetSidebarData, useSidebarStore } from '@/app/features/sidebar';
import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';

import ContentLayoutLoading from './ContentLayoutLoading';

const { Text, Title } = Typography;

interface Props {
  actionItems?: ItemType[];
  breadCrumb?: BreadcrumbItem[];
  children: React.ReactNode;
  contentNoPadding?: boolean;
  onChangeTab?: (navigateOptions: NavigateOptions) => void;
  tabs?: HeaderTabItem[];
  title?: string;
}

function ContentLayout({
  actionItems,
  breadCrumb,
  children,
  contentNoPadding,
  onChangeTab,
  tabs,
  title,
}: Props) {
  const navigate = useNavigate();
  const matchRoutes = useMatchRoute();
  const { isContentHeaderCollapsed, isContentHeaderSticky, setHeaderStates } =
    useHeaderStore();
  const { activeSubKey } = useGetSidebarData();
  const { setSubSidebarHistory } = useSidebarStore();

  const formattedBreadCrumb: BreadcrumbProps['items'] = breadCrumb?.map(
    ({ navigateOptions, onClick, title }) => ({
      onClick: () => {
        onClick?.();
        navigateOptions && navigate(navigateOptions);
      },
      title: (
        <Text
          className={cn(
            'font-medium',
            onClick || navigateOptions
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
            <Flex align="center" gap="0.75rem">
              <Title>{title}</Title>

              {actionItems ? (
                <Dropdown
                  menu={{
                    items: actionItems,
                  }}
                >
                  <Button
                    icon={
                      <Icon
                        height="20"
                        icon="solar:cat-bold-duotone"
                        width="20"
                      />
                    }
                  />
                </Dropdown>
              ) : null}
            </Flex>
          </Flex>

          <Flex align="end" className="h-full flex-1">
            {tabs?.length ? (
              <Tabs
                activeKey={JSON.stringify(
                  tabs.find(tab => !!matchRoutes(tab.navigateOptions))
                    ?.navigateOptions,
                )}
                className="w-full [&_.ant-tabs-nav-wrap]:justify-end [&_.ant-tabs-nav]:m-0"
                items={tabs.map(tab => {
                  const isActive = !!matchRoutes(tab.navigateOptions);

                  return {
                    key: JSON.stringify(tab.navigateOptions),
                    label: tab.menuItems ? (
                      <Dropdown
                        menu={{
                          items: tab.menuItems,
                        }}
                        open={isActive ? undefined : false}
                        placement="bottom"
                        trigger={['hover']}
                      >
                        <Flex align="center" gap="0.5rem">
                          <Text className="whitespace-nowrap">{tab.label}</Text>
                          {isActive ? <ArrowDown2 size="16" /> : null}
                        </Flex>
                      </Dropdown>
                    ) : (
                      <Text className="whitespace-nowrap">{tab.label}</Text>
                    ),
                  };
                })}
                more={{
                  visible: false,
                }}
                onChange={routeString => {
                  const route = JSON.parse(routeString) as NavigateOptions;

                  navigate(route);
                  onChangeTab?.(route);

                  if (activeSubKey) {
                    setSubSidebarHistory(activeSubKey, route);
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
