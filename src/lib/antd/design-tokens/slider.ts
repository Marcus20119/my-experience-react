import type { OverrideToken } from 'antd/es/theme/interface';

import { COLOR } from '@/shared/assets/styles/constants';

export const SLIDER: OverrideToken['Slider'] = {
  colorPrimaryBorderHover: COLOR.neutral['400'],
  controlSize: 24,
  handleActiveColor: COLOR.neutral['400'],
  handleColor: COLOR.neutral['400'],
  handleLineWidth: 1,
  handleLineWidthHover: 1,
  handleSize: 22,
  handleSizeHover: 22,
  railBg: COLOR.neutral['400'],
  railHoverBg: COLOR.neutral['400'],
  railSize: 2,
  trackBg: COLOR.neutral['800'],
  trackHoverBg: COLOR.neutral['800'],
};
