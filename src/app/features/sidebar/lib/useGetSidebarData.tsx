import { Box1, Colorfilter, Cpu, ElementEqual, Game } from 'iconsax-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import type { SidebarItem } from '../model';
import { useSidebarStore } from '../store';

export const useGetSidebarData = () => {
  const { t } = useTranslation();
  const { mainSidebarHistory, subSidebarHistory, technologySkeleton } =
    useSidebarStore();
  const { pathname } = useLocation();

  const defaultMainSidebarItems: SidebarItem[] = useMemo(() => {
    const technologyItems: SidebarItem['children'] =
      technologySkeleton?.map(item => {
        let sidebarItem: NonNullable<SidebarItem['children']>[number] = {
          key: item?.technologyType,
          label: item?.technologyType,
          match: `/technology/${item?.technologyType}`,
          route: {
            param: {
              type: item?.technologyType,
            },
            path: '/technology-type/:type',
          },
        };

        if (item?.technologySections?.length) {
          sidebarItem = {
            key: item?.technologyType,
            label: item?.technologyType,
            match: `/technology/${item?.technologyType}`,
            route: {
              param: {
                section: item?.technologySections?.[0]?.name?.original,
                type: item?.technologyType,
              },
              path: '/technology-type/:type/technology-section/:section',
            },
          };
        }

        return sidebarItem;
      }) ?? [];

    const items: SidebarItem[] = [
      {
        children: technologyItems,
        icon: <Cpu />,
        key: 'technology',
        label: t('layout.title.technology'),
        match: '/technology',
        route: technologyItems?.[0]?.route,
      },
      {
        children: [
          {
            key: 'table',
            label: t('layout.title.table'),
            match: '/component/table',
            route: {
              path: '/component/table/customizable',
            },
          },
          {
            key: 'form',
            label: t('layout.title.form'),
            match: '/component/form',
            route: {
              path: '/component/form/original',
            },
          },
          {
            key: 'field',
            label: t('layout.title.field'),
            match: '/component/field',
            route: {
              path: '/component/field/original',
            },
          },
          {
            key: 'calendar',
            label: t('layout.title.calendar'),
            match: '/component/calendar',
            route: {
              path: '/component/calendar/daily',
            },
          },
        ],
        icon: <Box1 />,
        key: 'component',
        label: t('layout.title.component'),
        match: '/component',
        route: {
          path: '/component/table/customizable',
        },
      },
      {
        children: [
          {
            key: 'canvaEditor',
            label: t('layout.title.canvaEditor'),
            match: '/feature/canva-editor',
            route: {
              path: '/feature/canva-editor',
            },
          },
          {
            key: 'excel',
            label: t('layout.title.excel'),
            match: '/feature/excel',
            route: { path: '/feature/excel' },
          },
          {
            key: 'chartPlayground',
            label: t('layout.title.chartPlayground'),
            match: '/feature/chart-playground',
            route: { path: '/feature/chart-playground' },
          },
          {
            key: 'formBuilder',
            label: t('layout.title.formBuilder'),
            match: '/feature/form-builder',
            route: { path: '/feature/form-builder' },
          },
          {
            key: 'dragAndDrop',
            label: t('layout.title.dragAndDrop'),
            match: '/feature/drag-and-drop',
            route: { path: '/feature/drag-and-drop' },
          },
          {
            key: 'fileReader',
            label: t('layout.title.fileReader'),
            match: '/feature/file-reader',
            route: { path: '/feature/file-reader' },
          },
        ],
        icon: <ElementEqual />,
        key: 'feature',
        label: t('layout.title.feature'),
        match: '/feature',
        route: { path: '/feature/canva-editor' },
      },
      {
        icon: <Colorfilter />,
        key: 'animation',
        label: t('layout.title.animation'),
        match: '/animation',
        route: { path: '/animation' },
      },
      {
        icon: <Game />,
        key: 'game',
        label: t('layout.title.game'),
        match: '/game',
        route: { path: '/game' },
      },
    ];

    return items;
  }, [t, technologySkeleton]);

  const mainSidebarItems = useMemo(
    () =>
      defaultMainSidebarItems.map(item => {
        const activeSubKeyFromHistory = mainSidebarHistory?.[item.key];

        const subSidebarItems = item.children?.map(child => {
          const subSideBarPathFromHistory = subSidebarHistory?.[child.key];

          return {
            ...child,
            route: subSideBarPathFromHistory ?? child.route,
          };
        });

        return {
          ...item,
          children: subSidebarItems,
          route: activeSubKeyFromHistory
            ? subSidebarItems?.find(
                subItem =>
                  JSON.stringify(subItem.route) ===
                  JSON.stringify(activeSubKeyFromHistory),
              )?.route ?? item.route
            : item.route,
        };
      }),
    [defaultMainSidebarItems, mainSidebarHistory, subSidebarHistory],
  );

  const activeMainKey =
    mainSidebarItems.find(item => pathname.includes(item.match))?.key ??
    'technology';

  const mainLabel = mainSidebarItems.find(
    item => item.key === activeMainKey,
  )?.label;

  const subSidebarItems = mainSidebarItems.find(
    item => item.key === activeMainKey,
  )?.children;

  const activeSubKey = subSidebarItems?.find(item =>
    pathname.includes(item.match),
  )?.key;

  return {
    activeMainKey,
    activeSubKey,
    mainLabel,
    mainSidebarItems,
    subSidebarItems,
  };
};
