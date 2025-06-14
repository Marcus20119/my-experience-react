import '../shared/assets/styles/index.css';
import 'dayjs/locale/vi';

import { addIcon } from '@iconify/react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { icons } from '@/shared/assets/svgs/generatedIcons';

import MainProvider from './main-provider';

icons.forEach(icon => {
  addIcon(`@local:${icon.name}`, {
    body: icon.content.body,
    height: icon.content.height || undefined,
    width: icon.content.width || undefined,
  });
});

dayjs.extend(isBetween);
dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainProvider />
  </React.StrictMode>,
);
