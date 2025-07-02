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
