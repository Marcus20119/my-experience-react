import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslation } from 'react-i18next';

import type { ThreeDTicketProps } from '@/shared/components/ticket/ThreeDTicket';

export const useGetLanguageItems = () => {
  const { t } = useTranslation();

  const languageItems: ThreeDTicketProps[] = [
    {
      color1: '#228acf',
      description: t('technology.description.typescript'),
      icon: (
        <Icon height="64" icon="vscode-icons:file-type-typescript" width="64" />
      ),
      rate: 3.5,
      title: 'TypeScript',
    },
    {
      color1: '#e6d148',
      description: t('technology.description.javascript'),
      icon: <Icon height="64" icon="@local:logo-javascript" width="64" />,
      rate: 4,
      title: 'Javascript',
    },
  ];

  return { languageItems };
};
