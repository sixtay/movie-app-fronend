import type { AppProps } from 'next/app';
import { AppThemeProvider, AppToastProvider } from '@/providers';
import { AuthContextProvider } from '@/providers/auth-provider';
import { Provider as AuthProvider } from '@/context/auth';
import { Provider as MovieProvider } from '@/context/movie';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/graphql/apollo';

function MovieApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppThemeProvider>
        <AppToastProvider>
          <AuthContextProvider>
            <SessionProvider>
              <AuthProvider>
                <MovieProvider>
                  <Component {...pageProps} />
                </MovieProvider>
              </AuthProvider>
            </SessionProvider>
          </AuthContextProvider>
        </AppToastProvider>
      </AppThemeProvider>
    </ApolloProvider>
  );
}

export default MovieApp;
