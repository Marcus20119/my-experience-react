import type { OverrideToken } from 'antd/es/theme/interface';

import { COLOR } from '@/shared/assets/styles/constants';

export const DATE_PICKER: OverrideToken['DatePicker'] = {
  activeShadow: `0 0 0 2px ${COLOR.neutral['300']}`,
  borderRadius: 8,
  borderRadiusLG: 8,
  borderRadiusSM: 8,
  cellHeight: 28,
  cellWidth: 40,
  colorBgBase: COLOR.neutral['0'],
  colorBgContainerDisabled: COLOR.neutral['100'],
  colorBorder: COLOR.neutral['400'],
  colorIcon: COLOR.neutral['600'],
  colorText: COLOR.neutral['700'],
  colorTextPlaceholder: COLOR.neutral['500'],
  controlHeight: 40,
  controlHeightLG: 48,
  controlHeightSM: 32,
};
