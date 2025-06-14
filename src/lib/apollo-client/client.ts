import type { DefaultContext, Operation } from '@apollo/client';
import { ApolloClient, ApolloLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';
import i18next from 'i18next';

import { useAuthStore } from '@/shared/stores';
import { ApolloService } from '@/shared/types';

import { cache } from './cache';
import { errorLink } from './errorLink';
import { getNamespace } from './getNamespace';

const DEFAULT_NAMESPACE = 'enouvo';

const TIME_ZONE_FOR_HEADER = Intl.DateTimeFormat().resolvedOptions().timeZone;

const privateLink = new HttpLink({
  uri: import.meta.env.VITE_PRIVATE_URL,
});
const publicLink = new HttpLink({
  uri: import.meta.env.VITE_PUBLIC_URL,
});

interface DynamicLink {
  link: HttpLink;
  name: ApolloService;
}

const ENDPOINTS: DynamicLink[] = [
  { link: privateLink, name: ApolloService.Private },
  { link: publicLink, name: ApolloService.Public },
];

const getHeaders = () => {
  const { accessToken: token } = useAuthStore.getState();
  const namespace =
    import.meta.env.VITE_NODE_ENV === 'dev'
      ? DEFAULT_NAMESPACE
      : getNamespace();

  return {
    ['Accept-Language']: i18next.language,
    authorization: token ? `Bearer ${token}` : '',
    namespace,
    platform: ['WHITELABEL_WEB'],
    timezone: TIME_ZONE_FOR_HEADER,
  };
};

const contextLink = setContext(
  (_, { headers }) =>
    ({
      headers: {
        ...headers,
        ...getHeaders(),
      },
    }) as unknown as DefaultContext,
);

const isClientFromContext = (client: ApolloService) => (op: Operation) =>
  op.getContext().service === client;

const dynamicApolloLink: ApolloLink = ENDPOINTS.reduce<ApolloLink | undefined>(
  (prevLink, nextLink) => {
    // When no name is specified, fallback to defaultLink.
    if (!prevLink) {
      return ApolloLink.split(
        isClientFromContext(nextLink.name),
        nextLink.link,
        undefined,
      );
    }

    return ApolloLink.split(
      isClientFromContext(nextLink.name),
      nextLink.link,
      prevLink,
    );
  },
  undefined,
) as ApolloLink;

export const apolloClient = new ApolloClient({
  cache,
  connectToDevTools: !import.meta.env.VITE_NODE_ENV,
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
  link: from([errorLink, contextLink, dynamicApolloLink]),
});
