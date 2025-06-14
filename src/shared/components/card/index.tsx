import { Card as AntCard } from 'antd';
import type { CardProps } from 'antd/lib';

import GridCard from './GridCard';

function Card({ children, ...props }: CardProps) {
  return <AntCard {...props}>{children}</AntCard>;
}

Card.Grid = GridCard;

export { Card };
export * from './GridCard';
