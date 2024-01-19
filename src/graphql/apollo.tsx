import {
  ApolloClient,
  createHttpLink,
  from,
  fromPromise,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getAuthToken, getRefreshToken, setAuthToken } from '@/storage/auth';

import {
  RefreshAuthTokensDocument,
  RefreshAuthTokensMutation,
} from '@/api/graphql/generated/graphql';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});
const cache = new InMemoryCache();

const authLink = setContext(async (_, { headers }) => {
  const token = await getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (true) {
          case 'INTERNAL_SERVER_ERROR' &&
            (err.extensions.exception as { status: number })?.status === 401:
            return fromPromise(getNewRefreshToken(client))
              .filter((value) => Boolean(value))
              .flatMap((res) => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${res.data?.refreshAuthTokens.accessToken}`,
                  },
                });
                return forward(operation);
              });
        }
      }
    }

    if (networkError) {
      const { message } = networkError;
      console.log({ networkError });
    }
  }
);

export const client = new ApolloClient({
  cache,
  link: from([errorLink, authLink, httpLink]),
});

const getNewRefreshToken = async (
  client: ApolloClient<NormalizedCacheObject>
) => {
  const refreshToken = await getRefreshToken();
  const res = await client.mutate<
    RefreshAuthTokensMutation,
    { refreshToken: string }
  >({
    mutation: RefreshAuthTokensDocument,
    variables: {
      refreshToken: refreshToken || '',
    },
  });
  if (res.data?.refreshAuthTokens) {
    await setAuthToken(res.data?.refreshAuthTokens, client);
  }
  return res;
};
export default client;
