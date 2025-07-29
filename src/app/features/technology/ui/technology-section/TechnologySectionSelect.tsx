import { useQuery } from '@tanstack/react-query';
import type { DefaultOptionType } from 'antd/es/select';

import type { MySelectProps } from '@/shared/components';
import { Select } from '@/shared/components';
import { displayContentTranslation } from '@/shared/components/field/i18n-fields';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';

interface Props extends MySelectProps {
  technologyType?: TechnologyType;
}

function TechnologySectionSelect({ technologyType, ...props }: Props) {
  const { data, isFetching, isRefetching } = useQuery({
    ...technologySectionQueries.all({
      filter: {
        technologyType,
      },
      pagination: {
        limit: 100,
        offset: 0,
      },
    }),
    enabled: !!technologyType,
  });

  const options: DefaultOptionType[] =
    data?.items.map(item => ({
      label: displayContentTranslation(item.name),
      value: item.id,
    })) || [];

  return (
    <Select
      loading={isFetching || isRefetching}
      options={options}
      placeholder="Select technology section ~"
      {...props}
    />
  );
}

export default TechnologySectionSelect;
