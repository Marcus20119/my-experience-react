import { onError } from '@apollo/client/link/error';
import { notification } from 'antd';
import type { GraphQLError } from 'graphql/error/GraphQLError';
import i18next from 'i18next';

import { useLocalStore } from '@/shared/stores/local.store';
import { NotiTool } from '@/shared/utils';

enum StatusCode {
  BadRequest = 400,
  Forbidden = 403,
  InternalServerError = 500,
  NotFound = 404,
  Ok = 200,
  Unauthorized = 401,
}

enum ErrorCode {
  AccountDisabled = 'ACCOUNT_DISABLED',
  SessionExpired = 'SESSION_EXPIRED',
  TokenExpired = 'TOKEN_EXPIRED',
  UserDisabled = 'USER_DISABLED',
}

interface GraphQLErrorExtension extends GraphQLError {
  code: ErrorCode & string;
  message: string;
  statusCode: StatusCode;
}

const errorLink = onError(({ graphQLErrors }) => {
  notification.config({
    maxCount: 1,
  });

  if (!graphQLErrors) return;

  const error: GraphQLErrorExtension =
    graphQLErrors[0] as GraphQLErrorExtension;

  NotiTool.showError({
    message:
      error.message ||
      i18next.t('common.error.smtWentWrong', {
        lng: useLocalStore.getState().language,
      }),
  });
});

export { errorLink };
