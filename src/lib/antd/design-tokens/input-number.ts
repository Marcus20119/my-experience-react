import type { OverrideToken } from 'antd/es/theme/interface';

import { COLOR } from '@/shared/assets/styles/constants';

export const INPUT_NUMBER: OverrideToken['InputNumber'] = {
  activeShadow: `0 0 0 2px ${COLOR.neutral['300']}`,
  borderRadius: 8,
  borderRadiusLG: 8,
  borderRadiusSM: 8,
  colorBorder: COLOR.neutral['400'],
  colorIcon: COLOR.neutral['500'],
  colorTextDisabled: COLOR.neutral['500'],
  colorTextPlaceholder: COLOR.neutral['500'],
  controlHeight: 40,
  controlHeightLG: 48,
  controlHeightSM: 32,
  controlItemBgHover: COLOR.neutral['200'],
  fontSize: 14,
  fontSizeLG: 16,
  fontSizeSM: 14,
  fontWeightStrong: 400,
};
