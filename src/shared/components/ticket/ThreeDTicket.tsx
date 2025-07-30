import type { NavigateOptions } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { Flex, Rate } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/tailwind';

import { StyledThreeDTicket } from './styles';

export interface ThreeDTicketProps {
  color1: string;
  color2?: null | string;
  color3?: null | string;
  description?: null | string;
  height?: string;
  icon: React.ReactNode;
  navigateOptions?: NavigateOptions;
  onClick?: () => void;
  rate?: null | number;
  shouldHighlightRate?: boolean;
  title: [string, string] | string;
  width?: string;
}

function ThreeDTicket({
  color1,
  color2,
  color3,
  description,
  height,
  icon,
  navigateOptions,
  onClick,
  rate,
  shouldHighlightRate,
  title,
  width,
}: ThreeDTicketProps) {
  const { t } = useTranslation();

  const defaultHeight = useMemo(() => {
    if (!description && !navigateOptions) {
      return '172px';
    }

    if (description && !navigateOptions) {
      return '220px';
    }

    return '260px';
  }, [description, navigateOptions]);

  return (
    <StyledThreeDTicket
      className={cn(onClick ? 'cursor-pointer' : 'cursor-default')}
      color1={color1}
      color2={color2}
      color3={color3}
      height={height ?? defaultHeight}
      onClick={() => {
        onClick?.();
      }}
      shouldHighlightRate={shouldHighlightRate}
      width={width}
    >
      <div className="card shadow-xl">
        <div className="content-box">
          {typeof title === 'string' ? (
            <span className="card-title">{title}</span>
          ) : (
            <div className="card-title-group">
              <span className="card-title">{title?.[0]}</span>
              <span className="card-title">{title?.[1]}</span>
            </div>
          )}
          {description ? <p className="card-content">{description}</p> : null}
          {navigateOptions ? (
            <Link
              className="see-more"
              onClick={e => {
                e.stopPropagation();
              }}
              {...navigateOptions}
            >
              {t('common.button.seeMore')}
            </Link>
          ) : null}
        </div>
        <div className="icon-box">{icon}</div>
      </div>

      <Flex className="star-board pr-5" justify="end">
        <Flex align="center" vertical>
          <Flex gap="4rem">
            <Flex className="w-fit" vertical>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <div className="string h-1.5 w-0.5" key={index} />
                ))}
            </Flex>

            <Flex className="w-fit" vertical>
              {Array(2)
                .fill(0)
                .map((_, index) => (
                  <div className="string h-1.5 w-0.5" key={index} />
                ))}
            </Flex>
          </Flex>

          <Flex className="board rounded-md px-3 pb-2">
            <Rate allowHalf disabled value={rate ?? 0} />
          </Flex>
        </Flex>
      </Flex>
    </StyledThreeDTicket>
  );
}

export default ThreeDTicket;
