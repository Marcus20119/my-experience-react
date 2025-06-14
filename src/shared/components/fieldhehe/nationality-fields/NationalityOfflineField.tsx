import type { DefaultOptionType } from 'antd/es/select';

import type { MySelectProps } from '@/shared/components';
import { Select } from '@/shared/components';
import type { CountryName } from '@/shared/tanstack/api/rest_countries';
import { FormTool } from '@/shared/utils';

import { countryNames } from './countryName.constant';

function NationalityOfflineField({ ...props }: MySelectProps) {
  const options: DefaultOptionType[] =
    countryNames?.map(name => ({
      label: name,
      value: name,
    })) ?? [];

  return (
    <Select<CountryName>
      filterOption={FormTool.filterOption}
      options={options}
      placeholder="Select nationality"
      showSearch
      {...props}
    />
  );
}

export default NationalityOfflineField;
