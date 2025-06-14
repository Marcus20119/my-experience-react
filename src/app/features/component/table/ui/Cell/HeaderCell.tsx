import { Typography } from 'antd';
import { useState } from 'react';
import { Resizable } from 'react-resizable';

import type { HeaderCellProps } from '@/app/features/component/table';
import { cn } from '@/lib/tailwind';

import { StyledHeader } from './styles';

const { Text } = Typography;

function HeaderCell({
  children,
  minWidth,
  onResetSize,
  onResizeEnd,
  onResizeStart,
  width,
  ...restProps
}: HeaderCellProps) {
  const [headerWidth, setHeaderWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);

  const resizableWidth = headerWidth || width;

  if (!width) {
    return (
      <StyledHeader {...restProps}>
        <Text className="line-clamp-1 [&_.ant-table-column-title]:line-clamp-1">
          {children}
        </Text>
      </StyledHeader>
    );
  }

  return (
    <StyledHeader
      {...restProps}
      className={cn(
        'relative',
        restProps.className,
        isResizing ? 'resizing' : '',
      )}
    >
      <Text className="line-clamp-1 [&_.ant-table-column-title]:line-clamp-1">
        {children}
      </Text>
      <Resizable
        draggableOpts={{ enableUserSelectHack: false }}
        handle={
          <button
            className="resize-handle absolute -right-1.5 bottom-0 z-tableResizableHandle grid h-full w-3 cursor-col-resize place-content-center"
            onClick={e => {
              e.stopPropagation();
            }}
            onDoubleClick={() => {
              onResetSize();
              setHeaderWidth(0);
            }}
            type="button"
          />
        }
        height={0}
        minConstraints={minWidth ? [minWidth, 0] : undefined}
        onResize={(_, { size }) => {
          setHeaderWidth(size.width);
        }}
        onResizeStart={() => {
          document.body.style.cursor = 'col-resize';
          setIsResizing(true);
          onResizeStart();
        }}
        onResizeStop={() => {
          document.body.style.cursor = 'default';
          setIsResizing(false);
          onResizeEnd(resizableWidth);
        }}
        width={resizableWidth}
      >
        <div
          className={cn(
            'resize-mask absolute bottom-0 left-0 top-0',
            isResizing
              ? 'border-0 border-r border-dashed border-primary bg-neutral-500/30'
              : 'bg-transparent',
          )}
          style={{
            right: `${width - resizableWidth}px`,
          }}
        />
      </Resizable>
    </StyledHeader>
  );
}

export default HeaderCell;
