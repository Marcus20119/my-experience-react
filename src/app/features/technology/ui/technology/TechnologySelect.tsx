import { useQuery } from '@tanstack/react-query';
import type { DefaultOptionType } from 'antd/es/select';

import type { MySelectProps } from '@/shared/components';
import { Select } from '@/shared/components';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';

interface Props extends MySelectProps {
  technologySectionId?: string;
  technologyType?: TechnologyType;
}

function TechnologySelect({
  technologySectionId,
  technologyType,
  ...props
}: Props) {
  const { data, isFetching, isRefetching } = useQuery({
    ...technologyQueries.all({
      filter: {
        technologySectionId,
        technologyType,
      },
      pagination: {
        limit: 100,
        offset: 0,
      },
    }),
    enabled: !!technologySectionId || !!technologyType,
  });

  const options: DefaultOptionType[] =
    data?.items.map(item => ({
      label: item.name,
      value: item.id,
    })) || [];

  return (
    <Select
      loading={isFetching || isRefetching}
      options={options}
      placeholder="Select technology ~"
      {...props}
    />
  );
}

export default TechnologySelect;
