import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { WIDTH } from '@/shared/assets/styles/constants/width';
import type { RouterNavigator } from '@/shared/hooks';
import type { TechnologySkeletonResponse } from '@/shared/tanstack/api/technologies';
import type { RemoveStates, SetStates } from '@/shared/types';

interface SidebarState {
  isMainBarCollapsed?: boolean;
  isSubBarCollapsed?: boolean;
  mainSidebarHistory?: Record<string, RouterNavigator>;
  subSidebarHistory?: Record<string, RouterNavigator>;
  technologySkeleton?: TechnologySkeletonResponse['technologySkeleton'];
}

interface SidebarAction {
  getSidebarWidth: () => number;
  removeSidebarStates: RemoveStates<SidebarState>;
  setMainSidebarHistory: (mainKey: string, route: RouterNavigator) => void;
  setSidebarStates: SetStates<SidebarState>;
  setSubSidebarHistory: (subKey: string, route: RouterNavigator) => void;
}

export const useSidebarStore = create<SidebarAction & SidebarState>()(
  devtools(
    persist(
      (set, get) => ({
        getSidebarWidth: () => {
          const { isMainBarCollapsed, isSubBarCollapsed } = get();

          if (isMainBarCollapsed && isSubBarCollapsed)
            return WIDTH.sidebarCollapsed;

          if (!isMainBarCollapsed && !isSubBarCollapsed)
            return WIDTH.sidebarExpanded * 2;

          if (isMainBarCollapsed && !isSubBarCollapsed)
            return WIDTH.sidebarExpanded + WIDTH.sidebarCollapsed;

          if (!isMainBarCollapsed && isSubBarCollapsed)
            return WIDTH.sidebarExpanded;

          return 0;
        },
        isMainBarCollapsed: true,
        isSubBarCollapsed: false,
        removeSidebarStates: keys =>
          set(() => {
            const newState: SidebarState = {};
            keys.forEach(key => (newState[key] = undefined));
            return newState;
          }),
        setMainSidebarHistory: (mainKey, route) => {
          set(state => ({
            mainSidebarHistory: {
              ...state.mainSidebarHistory,
              [mainKey]: route,
            },
          }));
        },
        setSidebarStates: param =>
          set(() => {
            const newState: SidebarState = {};
            Object.keys(param).forEach(key => {
              const k = key as keyof SidebarState;
              newState[k] = param[k] as undefined;
            });
            return newState;
          }),
        setSubSidebarHistory: (subKey, route) => {
          set(state => ({
            subSidebarHistory: {
              ...state.subSidebarHistory,
              [subKey]: route,
            },
          }));
        },
      }),
      {
        name: 'store-sidebar',
        storage: createJSONStorage(() => localStorage), // default
      },
    ),
  ),
);
