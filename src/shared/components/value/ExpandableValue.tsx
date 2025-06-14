import { Typography } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/tailwind';

const { Link, Paragraph } = Typography;

interface Props {
  className?: string;
  rows?: number;
  value?: null | string;
}

function ExpandableValue({ className, rows, value }: Props) {
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const [isEllipsis, setIsEllipsis] = useState(false);

  return (
    <Paragraph
      className={cn('mb-0', className)}
      ellipsis={{
        expandable: true,
        expanded,
        onEllipsis(ellipsis) {
          setIsEllipsis(ellipsis);
        },
        onExpand: () => {
          setExpanded(true);
        },
        rows: rows ?? 2,
        symbol: t('common.button.viewMore'),
      }}
    >
      {value}{' '}
      {isEllipsis ? (
        <Link
          className={cn(className, 'text-system-information')}
          onClick={() => {
            setExpanded(false);
          }}
        >
          {t('common.button.viewLess')}
        </Link>
      ) : null}
    </Paragraph>
  );
}

export default ExpandableValue;
