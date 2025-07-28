import type { DefaultOptionType } from 'antd/es/select';
import capitalize from 'lodash-es/capitalize';

import type { MySelectProps } from '@/shared/components';
import { Select } from '@/shared/components';
import { TechnologyType } from '@/shared/tanstack/api/technologies';

interface Props extends MySelectProps {}

function TechnologyTypeSelect({ ...props }: Props) {
  const options: DefaultOptionType[] = Object.values(TechnologyType)?.map(
    type => ({
      label: capitalize(type),
      value: type,
    }),
  );

  return (
    <Select
      options={options}
      placeholder="Select technology type ~"
      {...props}
    />
  );
}

export default TechnologyTypeSelect;
