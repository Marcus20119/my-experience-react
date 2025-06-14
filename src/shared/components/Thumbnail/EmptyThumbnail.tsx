import { Flex, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LogoEmpty } from '@/shared/assets/svgs/empty.svg';

const { Text } = Typography;

interface Props {
  description?: string;
  title?: string;
  type?: 'empty-data' | 'empty-search';
}

//TODO: create reuse EmptyData, with each type have each description text

function DisplayIcon({ type }: { type?: 'empty-data' | 'empty-search' }) {
  if (type === 'empty-data') {
    return <LogoEmpty />;
  }

  return <LogoEmpty />;
}

export function EmptyThumbnail({ description, title, type }: Props) {
  const { t } = useTranslation();

  const defaultTitle = useMemo(() => {
    if (type === 'empty-data') {
      return t('common.title.emptyData');
    }

    if (type === 'empty-search') {
      return t('common.title.emptySearch');
    }

    return t('common.title.emptyData');
  }, [t, type]);

  const defaultDescription = useMemo(() => {
    if (type === 'empty-search') {
      return t('common.description.emptySearch');
    }
  }, [t, type]);

  return (
    <Flex
      align="center"
      className="w-full"
      gap="0.5rem"
      justify="center"
      vertical
    >
      <Flex className="w-full" justify="center">
        <DisplayIcon type={type} />
      </Flex>

      <Text className="block text-base font-semibold text-neutral-600/80">
        {title ?? defaultTitle}
      </Text>

      {description || defaultDescription ? (
        <Text className="block text-neutral-600/80">
          {description ?? defaultDescription}
        </Text>
      ) : null}
    </Flex>
  );
}
