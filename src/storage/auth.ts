import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export type AuthTokenData = {
  __typename?: 'Tokens';
  accessToken: string;
  refreshToken: string;
};

const isBrowser = typeof window !== 'undefined';

export const getAuthToken = (): string | null => {
  if (isBrowser) {
    const tokenData = getAuthTokenData();
    return tokenData ? tokenData.accessToken : null;
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (isBrowser) {
    const tokenData = getAuthTokenData();
    return tokenData ? tokenData.refreshToken : null;
  }
  return null;
};

export const restartStore = (
  client: ApolloClient<NormalizedCacheObject>
): void => {
  if (isBrowser) {
    resetStore(client);
  }
};

export const setAuthToken = (
  token: AuthTokenData,
  client: ApolloClient<NormalizedCacheObject>
): void => {
  if (isBrowser) {
    localStorage.setItem('@token', JSON.stringify(token));
    restartStore(client);
  }
};

export const clearAuthToken = (
  client: ApolloClient<NormalizedCacheObject>
): void => {
  if (isBrowser) {
    localStorage.removeItem('@token');
    restartStore(client);
  }
};

export const clearAuthUser = (
  client: ApolloClient<NormalizedCacheObject>
): void => {
  if (isBrowser) {
    localStorage.removeItem('@token');
    localStorage.removeItem('@auth_user');
    restartStore(client);
  }
};

export const getAuthTokenData = (): AuthTokenData | null => {
  if (isBrowser) {
    const authToken = localStorage.getItem('@token');
    return authToken ? JSON.parse(authToken) : null;
  }
  return null;
};

export const resetStore = (
  apolloClient: ApolloClient<NormalizedCacheObject>
): void => {
  if (isBrowser) {
    apolloClient.clearStore();
  }
};
