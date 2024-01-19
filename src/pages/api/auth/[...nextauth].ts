import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { client } from '@/graphql/apollo';

import { LoginCredentialsEnum } from '@/enums';
import {
  LoginDocument,
  LoginInput,
  LoginMutation,
  RegisterDocument,
  RegisterMutation,
  ServiceTypes,
} from '@/api/graphql/generated/graphql';
export default (
  req: NextApiRequest,
  res: NextApiResponse
): void | Promise<void> =>
  NextAuth(req, res, {
    pages: {
      signIn: '/login',
      error: '/login',
    },
    session: { strategy: 'jwt' },
    providers: [
      CredentialsProvider({
        id: LoginCredentialsEnum.Credentials,
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
          keepMeLoggedIn: { type: 'boolean' },
        },
        authorize: async (credentials) => {
          const { email, password } = credentials!;
          try {
            const loginResponse = await client.mutate<LoginMutation>({
              mutation: LoginDocument,
              variables: {
                loginInput: {
                  params: {
                    email,
                    password,
                  },
                  service: ServiceTypes.Credentials,
                },
              },
            });
            if (!loginResponse?.data?.loginProvider?.user)
              throw new Error('User not found.');
            const { user } = loginResponse?.data?.loginProvider;
            return user;
          } catch (error) {
            console.error('Error in User authentication:', error);
            throw new Error('Authentication error.');
          }
        },
      }),
      CredentialsProvider({
        id: LoginCredentialsEnum.Register,
        credentials: {
          email: { type: 'email' },
          password: { type: 'password' },
        },
        authorize: async (credentials) => {
          const { email, password } = credentials!;
          try {
            const registerResponse = await client.mutate<RegisterMutation>({
              mutation: RegisterDocument,
              variables: {
                email,
                password,
              },
            });

            if (!registerResponse?.data?.register?.user)
              throw new Error('Error Registering User.');
            const { user } = registerResponse?.data?.register;
            return user;
          } catch (error) {
            console.error('Error Registering User', error);
            throw new Error('Authentication error.');
          }
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.user = user;
        }
        return token;
      },

      redirect({ url, baseUrl }) {
        if (url.startsWith(baseUrl)) return url;
        else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
        return baseUrl;
      },
      session: async ({ session, token }) => {
        if (token?.user) session.user = token.user;
        return session;
      },
    },
  });
