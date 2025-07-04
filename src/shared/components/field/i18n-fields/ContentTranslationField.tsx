import { Flex, Input, Typography } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import type { InputProps } from 'antd/lib';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '@/shared/components';
import type { I18NContentTranslation } from '@/shared/tanstack/api/technologies';
import { Language } from '@/shared/tanstack/api/technologies';

import { getLanguageServerFromI18next } from './i18nFields.utils';

const { Text } = Typography;

function LanguageLabel({ label, langKey }: { label: string; langKey: string }) {
  return (
    <Flex align="center" gap="0.25rem">
      <Text>{langKey}</Text>
      <Text className="text-neutral-500">{`(${label})`}</Text>
    </Flex>
  );
}

interface Props extends Omit<InputProps, 'onChange' | 'value'> {
  onChange?: (value: I18NContentTranslation[]) => void;
  value?: I18NContentTranslation[];
}

function ContentTranslationField({ onChange, value, ...props }: Props) {
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState<Language>(() =>
    getLanguageServerFromI18next(i18n.language),
  );

  const languageOptions: DefaultOptionType[] = [
    {
      key: 'EN',
      label: <LanguageLabel label={t('common.language.en')} langKey="EN" />,
      value: Language.En,
    },
    {
      key: 'VI',
      label: <LanguageLabel label={t('common.language.vi')} langKey="VI" />,
      value: Language.Vi,
    },
  ];

  useEffect(() => {
    setLang(getLanguageServerFromI18next(i18n.language));
  }, [i18n.language]);

  return (
    <Input
      {...props}
      addonAfter={
        <Select<Language>
          className="w-[4.5rem]"
          defaultValue={Language.En}
          labelRender={props => String(props.value).toUpperCase()}
          onChange={value => {
            setLang(value);
          }}
          options={languageOptions}
          popupMatchSelectWidth={false}
          value={lang}
        />
      }
      onChange={e => {
        if (!value?.length) {
          const newValue = languageOptions.map(item => ({
            content: item.value === lang ? e.target.value : '',
            lang: item.value as Language,
          }));

          onChange?.(newValue);
          return;
        }

        const newValue = value.map(item =>
          item.lang === lang ? { ...item, content: e.target.value } : item,
        );
        onChange?.(newValue);
      }}
      value={value?.find(item => item.lang === lang)?.content}
    />
  );
}

export default ContentTranslationField;
