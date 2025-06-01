import type { MySelectProps } from '@/shared/components';
import type { CountryName } from '@/shared/tanstack/api/rest_countries';
import type { DefaultOptionType } from 'antd/es/select';
import { Select } from '@/shared/components';
import { queries } from '@/shared/tanstack/queries';
import { FormTool } from '@/shared/utils';
import { useQuery } from '@tanstack/react-query';

function NationalityOnlineField({ ...props }: MySelectProps) {
  const { data: countries, isPending } = useQuery(
    queries.countries.all(['name', 'idd', 'flags', 'cca2']),
  );
  console.log(' countries:', countries);

  const options: DefaultOptionType[] =
    countries
      ?.sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
      ?.map(country => ({
        label: country.name.common,
        value: country.name.common,
      })) ?? [];

  return (
    <Select<CountryName>
      filterOption={FormTool.filterOption}
      loading={isPending}
      options={options}
      placeholder="Select nationality"
      showSearch
      {...props}
    />
  );
}

export default NationalityOnlineField;
