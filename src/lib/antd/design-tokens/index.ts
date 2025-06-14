import type { AliasToken } from 'antd/es/theme/interface';

import { COLOR, Z_INDEX } from '@/shared/assets/styles/constants';

export const token: Partial<AliasToken> = {
  colorError: COLOR.system.error,
  colorErrorBg: COLOR.system.errorSoft,
  colorErrorHover: COLOR.system.errorHover,
  colorInfo: COLOR.system.information,
  colorInfoBg: COLOR.system.informationSoft,
  colorSuccess: COLOR.system.success,
  colorSuccessBg: COLOR.system.successSoft,
  colorTextBase: COLOR.neutral['800'],
  colorWarning: COLOR.system.alert,
  colorWarningBg: COLOR.system.alertSoft,
  zIndexPopupBase: Number(Z_INDEX.popupSelectBase),
};
