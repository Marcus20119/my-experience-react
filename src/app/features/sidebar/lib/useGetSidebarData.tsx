import { Box1, Colorfilter, Cpu, ElementEqual, Game } from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import type { SidebarItem } from '../model';
import { MainSidebarKey, SubSidebarKey } from '../model';
import { useSidebarStore } from '../store';

export const useGetSidebarData = () => {
  const { t } = useTranslation();
  const { mainSidebarHistory, subSidebarHistory } = useSidebarStore();
  const { pathname } = useLocation();

  const defaultMainSidebarItems: SidebarItem[] = useMemo(() => {
    const items: SidebarItem[] = [
      {
        children: [
          {
            key: SubSidebarKey.Configuration,
            label: t('layout.title.configuration'),
            match: '/technology/configuration',
            path: '/technology/configuration',
          },
          {
            key: SubSidebarKey.Language,
            label: t('layout.title.language'),
            match: '/technology/language',
            path: '/technology/language',
          },
          {
            key: SubSidebarKey.UILibrary,
            label: t('layout.title.uiLibrary'),
            match: '/technology/ui-library',
            path: '/technology/ui-library',
          },
          {
            key: SubSidebarKey.OtherTech,
            label: t('layout.title.other'),
            match: '/technology/other',
            path: '/technology/other',
          },
        ],
        icon: <Cpu />,
        key: MainSidebarKey.Technology,
        label: t('layout.title.technology'),
        match: '/technology',
        path: '/technology/configuration',
      },
      {
        children: [
          {
            key: SubSidebarKey.Table,
            label: t('layout.title.table'),
            match: '/component/table',
            path: '/component/table/customizable',
          },
          {
            key: SubSidebarKey.Form,
            label: t('layout.title.form'),
            match: '/component/form',
            path: '/component/form/original',
          },
          {
            key: SubSidebarKey.Field,
            label: t('layout.title.field'),
            match: '/component/field',
            path: '/component/field/original',
          },
          {
            key: SubSidebarKey.Calendar,
            label: t('layout.title.calendar'),
            match: '/component/calendar',
            path: '/component/calendar/daily',
          },
        ],
        icon: <Box1 />,
        key: MainSidebarKey.Component,
        label: t('layout.title.component'),
        match: '/component',
        path: '/component/table/customizable',
      },
      {
        children: [
          {
            key: SubSidebarKey.CanvaEditor,
            label: t('layout.title.canvaEditor'),
            match: '/feature/canva-editor',
            path: '/feature/canva-editor',
          },
          {
            key: SubSidebarKey.Excel,
            label: t('layout.title.excel'),
            match: '/feature/excel',
            path: '/feature/excel',
          },
          {
            key: SubSidebarKey.ChartPlayground,
            label: t('layout.title.chartPlayground'),
            match: '/feature/chart-playground',
            path: '/feature/chart-playground',
          },
          {
            key: SubSidebarKey.FormBuilder,
            label: t('layout.title.formBuilder'),
            match: '/feature/form-builder',
            path: '/feature/form-builder',
          },
          {
            key: SubSidebarKey.DragAndDrop,
            label: t('layout.title.dragAndDrop'),
            match: '/feature/drag-and-drop',
            path: '/feature/drag-and-drop',
          },
          {
            key: SubSidebarKey.FileReader,
            label: t('layout.title.fileReader'),
            match: '/feature/file-reader',
            path: '/feature/file-reader',
          },
        ],
        icon: <ElementEqual />,
        key: MainSidebarKey.Feature,
        label: t('layout.title.feature'),
        match: '/feature',
        path: '/feature/canva-editor',
      },
      {
        icon: <Colorfilter />,
        key: MainSidebarKey.Animation,
        label: t('layout.title.animation'),
        match: '/animation',
        path: '/animation',
      },
      {
        icon: <Game />,
        key: MainSidebarKey.Game,
        label: t('layout.title.game'),
        match: '/game',
        path: '/game',
      },
    ];

    return items;
  }, [t]);

  const mainSidebarItems = useMemo(
    () =>
      defaultMainSidebarItems.map(item => {
        const activeSubKeyFromHistory =
          mainSidebarHistory?.[item.key as MainSidebarKey];

        const subSidebarItems = item.children?.map(child => {
          const subSideBarPathFromHistory =
            subSidebarHistory?.[child.key as SubSidebarKey];

          return {
            ...child,
            path: subSideBarPathFromHistory ?? child.path,
          };
        });

        return {
          ...item,
          children: subSidebarItems,
          path: activeSubKeyFromHistory
            ? subSidebarItems?.find(
                subItem => subItem.key === activeSubKeyFromHistory,
              )?.path ?? item.path
            : item.path,
        };
      }),
    [defaultMainSidebarItems, mainSidebarHistory, subSidebarHistory],
  );

  const activeMainKey = mainSidebarItems.find(item =>
    pathname.includes(item.match),
  )?.key as MainSidebarKey;

  const mainLabel = mainSidebarItems.find(
    item => item.key === activeMainKey,
  )?.label;

  const subSidebarItems = mainSidebarItems.find(
    item => item.key === activeMainKey,
  )?.children;

  const activeSubKey =
    mainSidebarHistory?.[activeMainKey] ??
    (subSidebarItems?.find(item => pathname.includes(item.match))
      ?.key as SubSidebarKey);

  return {
    activeMainKey,
    activeSubKey,
    mainLabel,
    mainSidebarItems,
    subSidebarItems,
  };
};
