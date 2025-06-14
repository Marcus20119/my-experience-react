import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { RemoveStates, SetStates } from '../types';

interface AuthState {
  accessToken?: string;
  isAuthenticated?: boolean;
  refreshToken?: string;
  shouldAuthenticating?: boolean;
}

interface AuthAction {
  removeAuthStates: RemoveStates<AuthState>;
  setAuthStates: SetStates<AuthState>;
}

export const useAuthStore = create<AuthAction & AuthState>()(
  devtools(
    persist(
      set => ({
        removeAuthStates: keys =>
          set(() => {
            const newState: AuthState = {};
            keys.forEach(key => (newState[key] = undefined));
            return newState;
          }),
        setAuthStates: param =>
          set(() => {
            const newState: AuthState = {};
            Object.keys(param).forEach(key => {
              const k = key as keyof AuthState;
              newState[k] = param[k] as undefined;
            });
            return newState;
          }),
      }),
      {
        name: 'store-auth',
        storage: createJSONStorage(() => localStorage), // default
      },
    ),
  ),
);
