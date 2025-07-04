import { Icon } from '@iconify/react/dist/iconify.js';
import { Cascader as AntdCascader, Tooltip } from 'antd';
import type { GetProps } from 'antd/lib';
import { ArrowDown2, ArrowRight2, ArrowUp2, CloseCircle } from 'iconsax-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';

function Cascader({
  allowClear,
  className,
  loading,
  onDropdownVisibleChange,
  ...props
}: GetProps<typeof AntdCascader>) {
  const [isOpened, setIsOpened] = useState(false);

  const suffixIcon = useMemo(() => {
    if (loading) {
      return (
        <Icon
          color={COLOR.neutral['500']}
          height="20"
          icon="line-md:loading-loop"
          width="20"
        />
      );
    }

    if (isOpened) {
      return <ArrowUp2 color={COLOR.neutral['700']} size="20" />;
    }

    return <ArrowDown2 color={COLOR.neutral['700']} size="20" />;
  }, [isOpened, loading]);

  return (
    <AntdCascader
      allowClear={
        allowClear
          ? {
              clearIcon: (
                <CloseCircle
                  color={COLOR.neutral['400']}
                  size="18"
                  variant="Bold"
                />
              ),
            }
          : undefined
      }
      className={cn('w-full', className)}
      expandIcon={<ArrowRight2 color={COLOR.neutral['700']} size="16" />}
      maxTagCount="responsive"
      maxTagPlaceholder={omittedValues => (
        <Tooltip
          overlayStyle={{ pointerEvents: 'none' }}
          title={omittedValues.map(({ label }) => label).join(', ')}
        >
          <span>{`+ ${omittedValues.length} ...`}</span>
        </Tooltip>
      )}
      onDropdownVisibleChange={open => {
        setIsOpened(open);
        onDropdownVisibleChange?.(open);
      }}
      suffixIcon={suffixIcon}
      {...props}
    />
  );
}

export { Cascader };
