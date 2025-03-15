import type { OverrideToken } from 'antd/es/theme/interface';
import { COLOR } from '@/shared/assets/styles/constants';

export const TABS: OverrideToken['Tabs'] = {
  colorPrimary: COLOR.neutral['700'],
  horizontalItemGutter: 12,
  horizontalItemPadding: '12px 16px',
  inkBarColor: COLOR.primary,
  titleFontSize: 16,
};
