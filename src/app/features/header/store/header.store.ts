import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { SubSidebarKey } from '@/app/features/sidebar';
import { HEIGHT } from '@/shared/assets/styles/constants/height';
import type { RemoveStates, SetStates } from '@/shared/types';

interface HeaderState {
  headerHistory?: Record<SubSidebarKey, RouterPath>;
  isContentHeaderCollapsed?: boolean;
  isContentHeaderSticky?: boolean;
}

interface HeaderAction {
  getHeaderHeight: () => number;
  removeHeaderStates: RemoveStates<HeaderState>;
  setHeaderHistory: (mainKey: SubSidebarKey, subKey: RouterPath) => void;
  setHeaderStates: SetStates<HeaderState>;
}

export const useHeaderStore = create<HeaderAction & HeaderState>()(
  devtools(
    persist(
      (set, get) => ({
        getHeaderHeight: () => {
          const { isContentHeaderCollapsed } = get();
          if (isContentHeaderCollapsed) return HEIGHT.headerMain;
          return HEIGHT.headerMain + HEIGHT.headerContent;
        },
        isContentHeaderCollapsed: false,
        removeHeaderStates: keys =>
          set(() => {
            const newState: HeaderState = {};
            keys.forEach(key => (newState[key] = undefined));
            return newState;
          }),
        setHeaderHistory: (mainKey, subKey) => {
          set(state => ({
            headerHistory: {
              ...(state.headerHistory as Record<SubSidebarKey, RouterPath>),
              [mainKey]: subKey,
            },
          }));
        },
        setHeaderStates: param =>
          set(() => {
            const newState: HeaderState = {};
            Object.keys(param).forEach(key => {
              const k = key as keyof HeaderState;
              newState[k] = param[k] as undefined;
            });
            return newState;
          }),
      }),
      {
        name: 'store-header',
        storage: createJSONStorage(() => localStorage), // default
      },
    ),
  ),
);
