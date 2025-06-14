import { useQuery } from '@tanstack/react-query';
import { Divider, Flex, Form, InputNumber, Space, Typography } from 'antd';
import { debounce, uniqBy } from 'lodash-es';
import { useEffect, useState } from 'react';

import { Select } from '@/shared/components';
import { DEFAULT_DEBOUNCE_TIME_OFFLINE } from '@/shared/constants';
import type {
  CountryCode,
  OnlineCountry,
} from '@/shared/tanstack/api/rest_countries';
import { queries } from '@/shared/tanstack/queries';
import { TextTool } from '@/shared/utils';

import SearchField from '../SearchField';
import type {
  PhoneNumberFieldProps,
  PhoneNumberOptionType,
  PhoneNumberValue,
} from './country.types';

const { Text } = Typography;

const formatOption = (country: OnlineCountry): PhoneNumberOptionType => {
  const flagSrc = country.flags.svg;
  const phoneCode =
    country.idd.suffixes?.length > 1
      ? country.idd.root
      : `${country.idd.root}${country.idd.suffixes[0]}`;
  const countryCode = country.cca2;
  const countryName = country.name.common;

  return {
    className:
      'p-1 flex items-center [&_.ant-select-item-option-content]:flex [&_.ant-select-item-option-content]:items-center [&_.ant-select-item-option-content]:gap-3',
    countryCode,
    countryName,
    label: (
      <>
        <img
          alt=""
          className="block h-fit w-[1.75rem] flex-shrink-0 overflow-hidden rounded-[0.25rem] object-cover"
          src={flagSrc}
        />
        <Text className="country-name">{countryName}</Text>
        <Text className="phone-code text-neutral-500">{phoneCode}</Text>
      </>
    ),
    phoneCode,
    value: countryCode,
  };
};

const getOption = (
  countries?: OnlineCountry[],
  countryCode?: CountryCode,
): PhoneNumberOptionType | undefined => {
  const selectedCountry = countries?.find(
    country => country.cca2 === countryCode,
  );

  return selectedCountry ? formatOption(selectedCountry) : undefined;
};

function PhoneNumberField({
  defaultCountryCode = 'VN',
  onChange,
  value,
}: PhoneNumberFieldProps) {
  const [form] = Form.useForm<{ search?: string }>();
  const [searchValue, setSearchValue] = useState<string>();

  const { data: countries, isPending } = useQuery(
    queries.countries.all(['name', 'idd', 'flags', 'cca2']),
  );

  const selectedOption = getOption(countries, value?.countryCode);
  const options: PhoneNumberOptionType[] =
    countries
      ?.filter(country => country.idd.root) // Filter out countries without phone code
      ?.sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
      ?.map(formatOption) ?? [];

  const renderOptions = selectedOption
    ? uniqBy([...options, selectedOption], 'value')
    : options;

  const onSetSearchValue = debounce((value: string) => {
    setSearchValue(value);
  }, DEFAULT_DEBOUNCE_TIME_OFFLINE);

  useEffect(() => {
    if (value) return;
    const defaultOption = getOption(countries, defaultCountryCode);

    if (defaultOption) {
      onChange?.({
        countryCode: defaultCountryCode,
        phoneCode: defaultOption.phoneCode,
        phoneNumber: '',
      });
    }
  }, [countries]);

  const dropdownRender = (menu: React.ReactNode) => (
    <Flex className="min-w-[18rem]" gap="0.25rem" vertical>
      <Form form={form} layout="vertical">
        <Form.Item name="search" noStyle>
          <SearchField
            className="rounded-md"
            onChange={e => onSetSearchValue(e.target.value)}
            variant="borderless"
          />
        </Form.Item>
      </Form>
      <Divider className="m-0" />
      {menu}
    </Flex>
  );

  return (
    <Space.Compact block>
      <Select<CountryCode>
        allowClear={false}
        className="w-20 [&_.ant-select-selection-item]:visible [&_.ant-select-selection-item]:flex [&_.ant-select-selection-item]:items-center [&_.country-name]:hidden [&_.phone-code]:hidden"
        defaultValue={defaultCountryCode}
        dropdownRender={dropdownRender}
        filterOption={(input, option) => {
          const { countryCode, countryName, phoneCode } =
            option as PhoneNumberOptionType;
          const formattedSearchValue = TextTool.latinize(input).toLowerCase();
          const formattedCountryName =
            TextTool.latinize(countryName).toLowerCase();
          const formattedCountryCode =
            TextTool.latinize(countryCode).toLowerCase();

          return (
            formattedCountryName.includes(formattedSearchValue) ||
            formattedCountryCode.includes(formattedSearchValue) ||
            phoneCode.includes(formattedSearchValue)
          );
        }}
        loading={isPending}
        onChange={(countryCode, option) => {
          onChange?.({
            ...(value as PhoneNumberValue),
            countryCode,
            phoneCode: (option as PhoneNumberOptionType)?.phoneCode,
          });
        }}
        onDropdownVisibleChange={visible => {
          if (!visible) {
            form.resetFields();
            setSearchValue('');
          }
        }}
        options={renderOptions}
        popupMatchSelectWidth={false}
        searchValue={searchValue}
      />
      <InputNumber
        className="w-full"
        controls={false}
        defaultValue={value?.phoneNumber}
        onChange={phoneNumber => {
          onChange?.({
            ...(value as PhoneNumberValue),
            phoneNumber: String(phoneNumber),
          });
        }}
        placeholder="000-000-000"
        prefix={
          selectedOption?.phoneCode ? (
            <Text className="text-neutral-500">
              ({selectedOption?.phoneCode})
            </Text>
          ) : null
        }
        stringMode
        type="number"
      />
    </Space.Compact>
  );
}

export default PhoneNumberField;
