import { Card } from 'antd';
import type { CardProps } from 'antd/lib';

import { cn } from '@/lib/tailwind';

const getWidthPercentage = (span: number) => `${(span / 24) * 100}%`;

export interface GridCardItem {
  content?: React.ReactNode;
  span: number;
}

interface Props extends CardProps {
  grids: GridCardItem[];
}

function GridCard({ grids, rootClassName, styles, ...props }: Props) {
  return (
    <Card
      rootClassName={cn('rounded-b-lg overflow-hidden', rootClassName)}
      {...props}
      styles={{
        ...styles,
        header: {
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 0.5,
          ...styles?.header,
        },
      }}
    >
      {grids.map((grid, index) => (
        <Card.Grid
          hoverable={false}
          key={index}
          style={{
            width: getWidthPercentage(grid.span),
          }}
        >
          {grid.content}
        </Card.Grid>
      ))}
    </Card>
  );
}

export default GridCard;
