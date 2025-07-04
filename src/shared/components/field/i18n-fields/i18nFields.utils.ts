import i18next from 'i18next';

import type { DisplayName } from '@/shared/tanstack/api/technologies';
import { Language } from '@/shared/tanstack/api/technologies';

export const getLanguageServerFromI18next = (lang?: null | string) => {
  switch (lang) {
    case 'en':
      return Language.En;
    case 'vi':
      return Language.Vi;
    default:
      return Language.En;
  }
};

export const displayContentTranslation = (name?: DisplayName) => {
  if (!name) return '';

  const lang = getLanguageServerFromI18next(i18next.language);

  const translatedName = name?.translations?.find(
    translation => translation?.lang === lang,
  )?.content;

  return translatedName || name?.original;
};
