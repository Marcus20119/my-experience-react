import round from 'lodash-es/round';

import i18n from '@/lib/i18next';

import { DEFAULT_CURRENCY_UNIT } from '../constants';
import { useLocalStore } from '../stores';

const formatterInputNumber = (num?: null | number | string): string => {
  if (!num || isNaN(Number(num))) return '';

  return `${num
    .toString()
    .replace(/^[+-]?\d+/, init =>
      init.replace(new RegExp(`(\\d)(?=(\\d{${3}})+$)`, 'g'), '$1,'),
    )}`;
};

const parserInputNumber = (value?: null | string): string =>
  value ? value.replace(/\$\s?|(,*)/g, '') : '';

const formatNumber = (num?: null | number | string, digit = 3) => {
  if (!num || isNaN(Number(num))) return '';
  const roundNum = round(Number(num), 2);

  return `${roundNum
    .toString()
    .replace(/^[+-]?\d+/, init =>
      init.replace(new RegExp(`(\\d)(?=(\\d{${digit}})+$)`, 'g'), '$1,'),
    )}`;
};

const formatMoney = (value?: null | number | string): string => {
  const symbol = DEFAULT_CURRENCY_UNIT;

  if (!value || isNaN(Number(value))) return `${symbol} 0`;

  return `${symbol} ${formatNumber(value)}`;
};

const roundNumber = (value?: null | number | string, digit = 2): string => {
  if (!value || isNaN(Number(value))) return '0';

  return `${Math.round(Number(value) * Math.pow(10, digit)) / Math.pow(10, digit)}`;
};

const roundMoney = (value?: null | number | string): string => {
  if (!value) return '0';

  const lng = useLocalStore.getState().language ?? 'en';

  if (Number(value) > 1000000) {
    return `${roundNumber(Number(value) / 1000000, 1)}${i18n.t(
      'common.unit.million',
      {
        lng,
      },
    )}`;
  }

  if (Number(value) > 1000) {
    return `${roundNumber(Number(value) / 1000, 1)}${i18n.t(
      'common.unit.thousand',
      {
        lng,
      },
    )}`;
  }

  return '0';
};

const formatRangeMoney = (
  minValue?: null | number | string,
  maxValue?: null | number | string,
): string => {
  const symbol = DEFAULT_CURRENCY_UNIT;

  if (
    (!minValue || isNaN(Number(minValue))) &&
    (!maxValue || isNaN(Number(maxValue)))
  ) {
    return `${symbol} 0`;
  }

  if (minValue === maxValue) return `${symbol} ${roundMoney(minValue)}`;

  const formattedMinValue = roundMoney(minValue);
  const formattedMaxValue = roundMoney(maxValue);

  return `${symbol} ${formattedMinValue} - ${formattedMaxValue}`;
};

export const NumberTool = {
  formatMoney,
  formatNumber,
  formatRangeMoney,
  formatterInputNumber,
  parserInputNumber,
  roundMoney,
  roundNumber,
};
