import { useQuery } from '@tanstack/react-query';
import type { DefaultOptionType } from 'antd/es/select';

import type { MySelectProps } from '@/shared/components';
import { Select } from '@/shared/components';
import { displayContentTranslation } from '@/shared/components/field/i18n-fields';
import { knowledgeGroupQueries } from '@/shared/tanstack/queries/technology';

interface Props extends MySelectProps {
  technologyId?: string;
}

function KnowledgeGroupSelect({ technologyId, ...props }: Props) {
  const { data, isFetching, isRefetching } = useQuery({
    ...knowledgeGroupQueries.all({
      filter: {
        technologyId,
      },
      pagination: {
        limit: 100,
        offset: 0,
      },
    }),
    enabled: !!technologyId,
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
      placeholder="Select knowledge group ~"
      {...props}
    />
  );
}

export default KnowledgeGroupSelect;
