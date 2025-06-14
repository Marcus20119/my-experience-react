import type { GetRef } from 'antd';
import { Tooltip, Typography } from 'antd';
import type { TextProps } from 'antd/es/typography/Text';
import type { TooltipProps } from 'antd/lib';
import { useRef } from 'react';

import { cn } from '@/lib/tailwind';

const { Text } = Typography;

type TextRef = GetRef<typeof Text>;

interface Props extends Omit<TextProps, 'children'> {
  tooltipProps?: TooltipProps;
  truncateLength?: 1 | 2 | 3 | 4 | 5 | 6;
  value?: null | string;
}

function TruncateTextValue({
  className,
  tooltipProps,
  truncateLength = 1,
  value,
  ...textProps
}: Props) {
  const textRef = useRef<TextRef>(null);

  const shouldShowTooltip =
    (textRef.current?.clientHeight ?? 0) < (textRef.current?.scrollHeight ?? 0);

  return (
    <Tooltip title={shouldShowTooltip ? value : undefined} {...tooltipProps}>
      <Text
        className={cn(
          className,
          truncateLength === 1 ? 'line-clamp-1' : '',
          truncateLength === 2 ? 'line-clamp-2' : '',
          truncateLength === 3 ? 'line-clamp-3' : '',
          truncateLength === 4 ? 'line-clamp-4' : '',
          truncateLength === 5 ? 'line-clamp-5' : '',
          truncateLength === 6 ? 'line-clamp-6' : '',
        )}
        ref={textRef}
        {...textProps}
      >
        {value}
      </Text>
    </Tooltip>
  );
}

export default TruncateTextValue;
