import { Typography } from 'antd';

import { cn } from '@/lib/tailwind';

const { Text } = Typography;

interface Props {
  className?: string;
  truncateLength?: 1 | 2 | 3 | 4 | 5 | 6;
  value?: null | number | string;
}

function TextCell({ className, truncateLength, value }: Props) {
  return (
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
    >
      {value}
    </Text>
  );
}

export default TextCell;
