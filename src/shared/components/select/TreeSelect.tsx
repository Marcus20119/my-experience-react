import { Icon } from '@iconify/react/dist/iconify.js';
import { Tooltip, TreeSelect as AntTreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd/lib';
import { ArrowDown2, ArrowRight2, ArrowUp2, CloseCircle } from 'iconsax-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';

function TreeSelect({
  allowClear,
  className,
  loading,
  onDropdownVisibleChange,
  popupClassName,
  ...props
}: TreeSelectProps) {
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
    <AntTreeSelect
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
      filterTreeNode={false}
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
      popupClassName={cn('[&_.ant-select-tree-checkbox]:mt-2', popupClassName)}
      suffixIcon={suffixIcon}
      switcherIcon={({ expanded }: { expanded?: boolean }) => {
        if (expanded) {
          return <ArrowDown2 size="12" variant="Bold" />;
        }

        return <ArrowRight2 size="12" variant="Bold" />;
      }}
      {...props}
    />
  );
}

export default TreeSelect;
