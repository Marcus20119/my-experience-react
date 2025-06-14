import { Breadcrumb, Flex, Image } from 'antd';
import { ArrowDown2, ArrowRight2, ArrowUp2 } from 'iconsax-react';

import { useHeaderStore } from '@/app/features/header';
import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import { Loading } from '@/shared/components';

function ContentLayoutLoading() {
  const { isContentHeaderCollapsed, isContentHeaderSticky, setHeaderStates } =
    useHeaderStore();

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
            <Breadcrumb
              items={[
                {
                  title: (
                    <Loading.Skeleton
                      className="rounded"
                      height="1.125rem"
                      width="6rem"
                    />
                  ),
                },
                {
                  title: (
                    <Loading.Skeleton
                      className="rounded"
                      height="1.125rem"
                      width="7rem"
                    />
                  ),
                },
              ]}
              separator={
                <ArrowRight2
                  className="translate-y-0.5"
                  color={COLOR.neutral['500']}
                  size="16"
                />
              }
            />
            <Loading.Skeleton
              className="rounded"
              height="1.645rem"
              width="10rem"
            />
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

      <Flex align="center" className="w-full flex-1" justify="center">
        <Image
          className="object-contain object-center"
          height="65%"
          preview={false}
          src="/images/cat_loading.gif"
        />
      </Flex>
    </Flex>
  );
}

export default ContentLayoutLoading;
