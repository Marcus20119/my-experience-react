import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import type { ThreeDTicketProps } from '@/shared/components/Ticket/ThreeDTicket';

export const useGetTechnologyItems = () => {
  const { t } = useTranslation();

  const technologyItems: Record<
    'configuration' | 'language' | 'other' | 'ui',
    ThreeDTicketProps[]
  > = {
    configuration: [
      {
        color1: '#59a9f6',
        color2: '#9f51f7',
        color3: '#b634f7',
        description: t('technology.description.vite'),
        icon: (
          <Icon height="64" icon="vscode-icons:file-type-vite" width="64" />
        ),
        rate: 3,
        title: 'Vite',
      },
      {
        color1: '#7c7cea',
        color2: '#4931bd',
        description: t('technology.description.eslint'),
        icon: (
          <Icon height="64" icon="vscode-icons:file-type-eslint" width="64" />
        ),
        rate: 4,
        title: 'ESLint',
      },
      {
        color1: '#454545',
        color2: '#8a9fb8',
        description: t('technology.description.husky'),
        icon: (
          <Icon
            height="64"
            icon="file-icons:husky"
            style={{ color: '#000' }}
            width="64"
          />
        ),
        rate: 3,
        title: 'Husky',
      },
      {
        color1: '#ff7ace',
        color2: '#e0328c',
        color3: '#b70576',
        description: t('technology.description.graphql'),
        icon: (
          <Icon height="64" icon="vscode-icons:file-type-graphql" width="64" />
        ),
        rate: 4.5,
        title: 'GraphQL',
      },
      {
        color1: '#00435b',
        color2: '#ff4154',
        color3: '#ffd94c',
        description: t('technology.description.reactQuery'),
        icon: <Icon height="64" icon="logos:react-query-icon" width="64" />,
        rate: 2.5,
        title: 'React Query',
      },
      {
        color1: '#67b8ae',
        color2: '#009788',
        color3: '#064b3e',
        description: t('technology.description.i18next'),
        icon: (
          <Icon
            color="#064b3e"
            height="64"
            icon="simple-icons:i18next"
            width="64"
          />
        ),
        rate: 4,
        title: 'i18next',
      },
    ],
    language: [
      {
        color1: '#228acf',
        description: t('technology.description.typescript'),
        icon: (
          <Icon
            height="64"
            icon="vscode-icons:file-type-typescript"
            width="64"
          />
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
    ],
    other: [
      {
        color1: '#729b1b',
        color2: '#b8cc8e',
        color3: '#fcc72b',
        description: t('technology.description.vitest'),
        icon: (
          <Icon height="64" icon="vscode-icons:file-type-vitest" width="64" />
        ),
        rate: 3,
        title: 'Vitest',
      },
    ],
    ui: [
      {
        color1: '#4285eb',
        color2: '#29cdff',
        color3: '#f74a5c',
        description: t('technology.description.antDesign'),
        icon: <Icon height="64" icon="logos:ant-design" width="64" />,
        rate: 5,
        title: 'Ant Design',
      },
      {
        color1: '#0f3348',
        color2: '#39bcf9',
        color3: '#44a8b3',
        description: t('technology.description.tailwind'),
        icon: (
          <Icon
            color="#095566"
            height="64"
            icon="ri:tailwind-css-fill"
            width="64"
          />
        ),
        rate: 5,
        title: 'Tailwind CSS',
      },
      {
        color1: '#c968bc',
        color2: '#b48531',
        color3: '#764775',
        description: t('technology.description.emotion'),
        icon: <Icon height="64" icon="@local:logo-emotion" width="64" />,
        rate: 4.5,
        title: 'Emotion',
      },
    ],
  };

  return { technologyItems };
};
