import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { NotiTool } from '@/shared/utils';

const { showError } = NotiTool;

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: error => {
        showError({
          message:
            error instanceof AxiosError
              ? error.response?.data?.message || 'Something went wrong ~'
              : 'Something went wrong ~',
        });
      },
    },
    queries: {
      staleTime: Infinity,
    },
  },
});
