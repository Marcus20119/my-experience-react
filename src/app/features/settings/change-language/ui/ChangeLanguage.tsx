import type { DefaultOptionType } from 'antd/es/select';
import { useTranslation } from 'react-i18next';

import { Select } from '@/shared/components';
import { useLocalStore } from '@/shared/stores';
import { Language } from '@/shared/tanstack/api/technologies';

function ChangeLanguage() {
  const { t } = useTranslation();
  const { language, setLocalStates } = useLocalStore();

  const options: DefaultOptionType[] = [
    {
      label: t('common.language.en'),
      value: Language.En,
    },
    {
      label: t('common.language.vi'),
      value: Language.Vi,
    },
  ];

  return (
    <Select<Language>
      className="w-[20rem]"
      onChange={(language: Language) => {
        setLocalStates({ language });
      }}
      options={options}
      size="middle"
      value={language}
      variant="filled"
    />
  );
}

export default ChangeLanguage;
