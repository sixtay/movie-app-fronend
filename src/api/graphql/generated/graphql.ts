import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  tokens?: Maybe<Tokens>;
  user?: Maybe<User>;
};

export type CreateMovieInput = {
  director?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  publishedYear: Scalars['Int'];
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  title: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  timezone?: InputMaybe<Scalars['String']>;
};

export type LoginInput = {
  params: LoginParamsInput;
  service: ServiceTypes;
};

export type LoginParamsInput = {
  accessToken?: InputMaybe<Scalars['String']>;
  accessTokenSecret?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type LogoutResult = {
  __typename?: 'LogoutResult';
  success?: Maybe<Scalars['Boolean']>;
};

export type Movie = MovieInterface & {
  __typename?: 'Movie';
  createdAt?: Maybe<Scalars['DateTime']>;
  director?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image: Scalars['String'];
  publishedYear: Scalars['Int'];
  releaseDate?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MovieInterface = {
  createdAt?: Maybe<Scalars['DateTime']>;
  director?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  genre?: Maybe<Scalars['String']>;
  image: Scalars['String'];
  publishedYear: Scalars['Int'];
  releaseDate?: Maybe<Scalars['DateTime']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MoviePayload = {
  director?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  genre?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  publishedYear: Scalars['Int'];
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMovie: Movie;
  createUser: User;
  login: Scalars['Boolean'];
  loginProvider: Account;
  logout: LogoutResult;
  refreshAuthTokens: Tokens;
  register: Account;
  removeMovie?: Maybe<Movie>;
  removeUser?: Maybe<User>;
  updateMovie: Movie;
  updateUser: User;
};


export type MutationCreateMovieArgs = {
  createMovieInput: CreateMovieInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
};


export type MutationLoginProviderArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type MutationRefreshAuthTokensArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveMovieArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateMovieArgs = {
  updateMovieInput: UpdateMovieInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  movie?: Maybe<Movie>;
  movies: Array<Maybe<Movie>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryMovieArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum ServiceTypes {
  Apple = 'Apple',
  Credentials = 'Credentials',
  Facebook = 'Facebook',
  Google = 'Google',
  Jwt = 'JWT',
  MagicLink = 'MagicLink'
}

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type UpdateMovieInput = {
  id: Scalars['ID'];
  movie: MoviePayload;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  timezone?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type LoginMutationVariables = Exact<{
  loginInput?: InputMaybe<LoginInput>;
}>;


export type LoginMutation = { __typename?: 'Mutation', loginProvider: { __typename?: 'Account', id: string, tokens?: { __typename?: 'Tokens', accessToken: string, refreshToken: string } | null, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, timezone?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'Account', id: string, user?: { __typename?: 'User', id: string, firstName?: string | null, lastName?: string | null, email: string, timezone?: string | null, createdAt?: any | null, updatedAt?: any | null } | null, tokens?: { __typename?: 'Tokens', accessToken: string, refreshToken: string } | null } };

export type MagicLoginMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type MagicLoginMutation = { __typename?: 'Mutation', login: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'LogoutResult', success?: boolean | null } };

export type RefreshAuthTokensMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshAuthTokensMutation = { __typename?: 'Mutation', refreshAuthTokens: { __typename?: 'Tokens', accessToken: string, refreshToken: string } };

export type MovieFieldsFragment = { __typename?: 'Movie', id: string, title: string, image: string, releaseDate?: any | null, genre?: string | null, duration?: number | null, director?: string | null, publishedYear: number, createdAt?: any | null, updatedAt?: any | null };

export type CreateMovieMutationVariables = Exact<{
  input: CreateMovieInput;
}>;


export type CreateMovieMutation = { __typename?: 'Mutation', createMovie: { __typename?: 'Movie', id: string, title: string, image: string, releaseDate?: any | null, genre?: string | null, duration?: number | null, director?: string | null, publishedYear: number, createdAt?: any | null, updatedAt?: any | null } };

export type UpdateMovieMutationVariables = Exact<{
  id: Scalars['ID'];
  input: MoviePayload;
}>;


export type UpdateMovieMutation = { __typename?: 'Mutation', updateMovie: { __typename?: 'Movie', id: string, title: string, image: string, releaseDate?: any | null, genre?: string | null, duration?: number | null, director?: string | null, publishedYear: number, createdAt?: any | null, updatedAt?: any | null } };

export type RemoveMovieMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveMovieMutation = { __typename?: 'Mutation', removeMovie?: { __typename?: 'Movie', id: string, title: string, image: string, releaseDate?: any | null, genre?: string | null, duration?: number | null, director?: string | null, publishedYear: number, createdAt?: any | null, updatedAt?: any | null } | null };

export type GetAllMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMoviesQuery = { __typename?: 'Query', movies: Array<{ __typename?: 'Movie', id: string, title: string, image: string, releaseDate?: any | null, genre?: string | null, duration?: number | null, director?: string | null, publishedYear: number, createdAt?: any | null, updatedAt?: any | null } | null> };

export type GetMovieByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetMovieByIdQuery = { __typename?: 'Query', movie?: { __typename?: 'Movie', id: string, title: string, image: string, releaseDate?: any | null, genre?: string | null, duration?: number | null, director?: string | null, publishedYear: number, createdAt?: any | null, updatedAt?: any | null } | null };

export const MovieFieldsFragmentDoc = gql`
    fragment MovieFields on Movie {
  id
  title
  image
  releaseDate
  genre
  duration
  director
  publishedYear
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation login($loginInput: LoginInput) {
  loginProvider(loginInput: $loginInput) {
    id
    tokens {
      accessToken
      refreshToken
    }
    user {
      id
      firstName
      lastName
      email
      timezone
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($email: String!, $password: String!) {
  register(email: $email, password: $password) {
    id
    user {
      id
      firstName
      lastName
      email
      timezone
      createdAt
      updatedAt
    }
    tokens {
      accessToken
      refreshToken
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MagicLoginDocument = gql`
    mutation magicLogin($email: String!) {
  login(email: $email)
}
    `;
export type MagicLoginMutationFn = Apollo.MutationFunction<MagicLoginMutation, MagicLoginMutationVariables>;

/**
 * __useMagicLoginMutation__
 *
 * To run a mutation, you first call `useMagicLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMagicLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [magicLoginMutation, { data, loading, error }] = useMagicLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useMagicLoginMutation(baseOptions?: Apollo.MutationHookOptions<MagicLoginMutation, MagicLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MagicLoginMutation, MagicLoginMutationVariables>(MagicLoginDocument, options);
      }
export type MagicLoginMutationHookResult = ReturnType<typeof useMagicLoginMutation>;
export type MagicLoginMutationResult = Apollo.MutationResult<MagicLoginMutation>;
export type MagicLoginMutationOptions = Apollo.BaseMutationOptions<MagicLoginMutation, MagicLoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshAuthTokensDocument = gql`
    mutation refreshAuthTokens($refreshToken: String!) {
  refreshAuthTokens(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshAuthTokensMutationFn = Apollo.MutationFunction<RefreshAuthTokensMutation, RefreshAuthTokensMutationVariables>;

/**
 * __useRefreshAuthTokensMutation__
 *
 * To run a mutation, you first call `useRefreshAuthTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAuthTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAuthTokensMutation, { data, loading, error }] = useRefreshAuthTokensMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshAuthTokensMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAuthTokensMutation, RefreshAuthTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAuthTokensMutation, RefreshAuthTokensMutationVariables>(RefreshAuthTokensDocument, options);
      }
export type RefreshAuthTokensMutationHookResult = ReturnType<typeof useRefreshAuthTokensMutation>;
export type RefreshAuthTokensMutationResult = Apollo.MutationResult<RefreshAuthTokensMutation>;
export type RefreshAuthTokensMutationOptions = Apollo.BaseMutationOptions<RefreshAuthTokensMutation, RefreshAuthTokensMutationVariables>;
export const CreateMovieDocument = gql`
    mutation CreateMovie($input: CreateMovieInput!) {
  createMovie(createMovieInput: $input) {
    ...MovieFields
  }
}
    ${MovieFieldsFragmentDoc}`;
export type CreateMovieMutationFn = Apollo.MutationFunction<CreateMovieMutation, CreateMovieMutationVariables>;

/**
 * __useCreateMovieMutation__
 *
 * To run a mutation, you first call `useCreateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMovieMutation, { data, loading, error }] = useCreateMovieMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMovieMutation(baseOptions?: Apollo.MutationHookOptions<CreateMovieMutation, CreateMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMovieMutation, CreateMovieMutationVariables>(CreateMovieDocument, options);
      }
export type CreateMovieMutationHookResult = ReturnType<typeof useCreateMovieMutation>;
export type CreateMovieMutationResult = Apollo.MutationResult<CreateMovieMutation>;
export type CreateMovieMutationOptions = Apollo.BaseMutationOptions<CreateMovieMutation, CreateMovieMutationVariables>;
export const UpdateMovieDocument = gql`
    mutation UpdateMovie($id: ID!, $input: MoviePayload!) {
  updateMovie(updateMovieInput: {id: $id, movie: $input}) {
    ...MovieFields
  }
}
    ${MovieFieldsFragmentDoc}`;
export type UpdateMovieMutationFn = Apollo.MutationFunction<UpdateMovieMutation, UpdateMovieMutationVariables>;

/**
 * __useUpdateMovieMutation__
 *
 * To run a mutation, you first call `useUpdateMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMovieMutation, { data, loading, error }] = useUpdateMovieMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMovieMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMovieMutation, UpdateMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMovieMutation, UpdateMovieMutationVariables>(UpdateMovieDocument, options);
      }
export type UpdateMovieMutationHookResult = ReturnType<typeof useUpdateMovieMutation>;
export type UpdateMovieMutationResult = Apollo.MutationResult<UpdateMovieMutation>;
export type UpdateMovieMutationOptions = Apollo.BaseMutationOptions<UpdateMovieMutation, UpdateMovieMutationVariables>;
export const RemoveMovieDocument = gql`
    mutation RemoveMovie($id: ID!) {
  removeMovie(id: $id) {
    ...MovieFields
  }
}
    ${MovieFieldsFragmentDoc}`;
export type RemoveMovieMutationFn = Apollo.MutationFunction<RemoveMovieMutation, RemoveMovieMutationVariables>;

/**
 * __useRemoveMovieMutation__
 *
 * To run a mutation, you first call `useRemoveMovieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMovieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMovieMutation, { data, loading, error }] = useRemoveMovieMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveMovieMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMovieMutation, RemoveMovieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMovieMutation, RemoveMovieMutationVariables>(RemoveMovieDocument, options);
      }
export type RemoveMovieMutationHookResult = ReturnType<typeof useRemoveMovieMutation>;
export type RemoveMovieMutationResult = Apollo.MutationResult<RemoveMovieMutation>;
export type RemoveMovieMutationOptions = Apollo.BaseMutationOptions<RemoveMovieMutation, RemoveMovieMutationVariables>;
export const GetAllMoviesDocument = gql`
    query GetAllMovies {
  movies {
    ...MovieFields
  }
}
    ${MovieFieldsFragmentDoc}`;

/**
 * __useGetAllMoviesQuery__
 *
 * To run a query within a React component, call `useGetAllMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllMoviesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllMoviesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllMoviesQuery, GetAllMoviesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllMoviesQuery, GetAllMoviesQueryVariables>(GetAllMoviesDocument, options);
      }
export function useGetAllMoviesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllMoviesQuery, GetAllMoviesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllMoviesQuery, GetAllMoviesQueryVariables>(GetAllMoviesDocument, options);
        }
export type GetAllMoviesQueryHookResult = ReturnType<typeof useGetAllMoviesQuery>;
export type GetAllMoviesLazyQueryHookResult = ReturnType<typeof useGetAllMoviesLazyQuery>;
export type GetAllMoviesQueryResult = Apollo.QueryResult<GetAllMoviesQuery, GetAllMoviesQueryVariables>;
export const GetMovieByIdDocument = gql`
    query GetMovieById($id: ID!) {
  movie(id: $id) {
    ...MovieFields
  }
}
    ${MovieFieldsFragmentDoc}`;

/**
 * __useGetMovieByIdQuery__
 *
 * To run a query within a React component, call `useGetMovieByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMovieByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMovieByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMovieByIdQuery(baseOptions: Apollo.QueryHookOptions<GetMovieByIdQuery, GetMovieByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMovieByIdQuery, GetMovieByIdQueryVariables>(GetMovieByIdDocument, options);
      }
export function useGetMovieByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMovieByIdQuery, GetMovieByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMovieByIdQuery, GetMovieByIdQueryVariables>(GetMovieByIdDocument, options);
        }
export type GetMovieByIdQueryHookResult = ReturnType<typeof useGetMovieByIdQuery>;
export type GetMovieByIdLazyQueryHookResult = ReturnType<typeof useGetMovieByIdLazyQuery>;
export type GetMovieByIdQueryResult = Apollo.QueryResult<GetMovieByIdQuery, GetMovieByIdQueryVariables>;