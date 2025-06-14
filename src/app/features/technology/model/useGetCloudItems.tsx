import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import type { ThreeDTicketProps } from '@/shared/components/ticket/ThreeDTicket';

export const useGetCloudItems = () => {
  const { t } = useTranslation();

  const cloudItems: ThreeDTicketProps[] = [
    {
      color1: '#8fc4ff',
      color2: '#afb5ff',
      color3: '#d9a4ff',
      description: t('technology.description.aws'),
      icon: <Icon height="64" icon="logos:aws" width="64" />,
      path: '/technology/cloud/aws',
      rate: 3.5,
      title: 'AWS',
    },
  ];

  return { cloudItems };
};
