import type { OverrideToken } from 'antd/es/theme/interface';

import { COLOR } from '@/shared/assets/styles/constants';

export const PAGINATION: OverrideToken['Pagination'] = {
  borderRadiusSM: 8,
  boxShadow: `0 0 0 2px ${COLOR.neutral['300']}`,
  colorBorder: COLOR.neutral['400'],
  colorTextDisabled: COLOR.neutral['500'],
  controlHeightSM: 32,
  controlItemBgHover: COLOR.neutral['200'],
  fontSizeSM: 14,
};
