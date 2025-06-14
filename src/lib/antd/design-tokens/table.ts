import type { OverrideToken } from 'antd/es/theme/interface';

import { COLOR } from '@/shared/assets/styles/constants';

export const TABLE: OverrideToken['Table'] = {
  rowSelectedBg: COLOR.primaryLight,
  rowSelectedHoverBg: COLOR.neutral['300'],
};
