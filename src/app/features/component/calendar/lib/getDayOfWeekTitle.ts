import { t } from 'i18next';

import { useLocalStore } from '@/shared/stores';

import * as model from '../model';

/**
 * Get the title of the day of the week.
 * @param dayOfWeek - day of the week
 * @returns title of the day of the week
 */

export const getDayOfWeekTitle = (dayOfWeek: model.DayOfWeek) => {
  const { language } = useLocalStore.getState();

  switch (dayOfWeek) {
    case model.DayOfWeek.Monday:
      return t('common.dayOfWeek.mon', { lng: language });
    case model.DayOfWeek.Tuesday:
      return t('common.dayOfWeek.tue', { lng: language });
    case model.DayOfWeek.Wednesday:
      return t('common.dayOfWeek.wed', { lng: language });
    case model.DayOfWeek.Thursday:
      return t('common.dayOfWeek.thu', { lng: language });
    case model.DayOfWeek.Friday:
      return t('common.dayOfWeek.fri', { lng: language });
    case model.DayOfWeek.Saturday:
      return t('common.dayOfWeek.sat', { lng: language });
    case model.DayOfWeek.Sunday:
      return t('common.dayOfWeek.sun', { lng: language });
    default:
      return '';
  }
};
