import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import { WIDTH } from '@/shared/assets/styles/constants/width';
import type { RemoveStates, SetStates } from '@/shared/types';

import type { MainSidebarKey, SubSidebarKey } from '../model';

interface SidebarState {
  isMainBarCollapsed?: boolean;
  isSubBarCollapsed?: boolean;
  mainSidebarHistory?: Record<MainSidebarKey, SubSidebarKey>;
  subSidebarHistory?: Record<SubSidebarKey, RouterPath>;
}

interface SidebarAction {
  getSidebarWidth: () => number;
  removeSidebarStates: RemoveStates<SidebarState>;
  setMainSidebarHistory: (
    mainKey: MainSidebarKey,
    subKey: SubSidebarKey,
  ) => void;
  setSidebarStates: SetStates<SidebarState>;
  setSubSidebarHistory: (subKey: SubSidebarKey, path: RouterPath) => void;
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
        setMainSidebarHistory: (mainKey, subKey) => {
          set(state => ({
            mainSidebarHistory: {
              ...(state.mainSidebarHistory as Record<
                MainSidebarKey,
                SubSidebarKey
              >),
              [mainKey]: subKey,
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
        setSubSidebarHistory: (subKey, path) => {
          set(state => ({
            subSidebarHistory: {
              ...(state.subSidebarHistory as Record<SubSidebarKey, RouterPath>),
              [subKey]: path,
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
