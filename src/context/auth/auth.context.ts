import createDataContext from '@/libs/create-data-context';

import { AUTH } from '../../constants/store';
import { Action } from '../types';
import { ToastContextType } from '@/providers/toast-provider';
import { getSession, signIn, signOut } from 'next-auth/react';
import { LoginCredentialsEnum } from '@/enums';

const authReducer = (
  state = {
    signupFormIsSubmitting: false,
    user: null,
    isHydrated: false,
  },
  action: Action
) => {
  switch (action.type) {
    case AUTH.SIGNINATTEMPTED:
      return { ...state, isSubmitting: true };
    case AUTH.SIGNINSUCCESS:
      return {
        ...state,
        isSubmitting: false,
        user: action.payload.user,
        tokens: action.payload.tokens,
      };
    case AUTH.SIGNINFAILED:
      return { ...state };
    case AUTH.SIGNUPATTEMPTED:
      return { ...state, signupFormIsSubmitting: true };
    case AUTH.SIGNUPSUCCESS:
      return {
        ...state,
        activationLink: action.payload,
        signupFormIsSubmitting: false,
      };
    case AUTH.SIGNUPFAILED:
      return {
        ...state,
        signupFormIsSubmitting: false,
      };
    case AUTH.HYDRATESUCCESS:
      return {
        ...state,
        ...action.payload,
        isHydrated: true,
      };
    case AUTH.HYDRATEFAILED:
      return {
        ...state,
        isHydrated: true,
      };
    case AUTH.VALIDATEACCOUNTATTEMPTED:
      return {
        ...state,
        isHydrated: true,
      };
    case AUTH.VALIDATEACCOUNTSUCCESS:
      return {
        ...state,
        isHydrated: true,
      };
    case AUTH.VALIDATEACCOUNTFAILED:
      return {
        ...state,
        isHydrated: true,
      };

    case AUTH.SIGNOUTSUCCESS:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

type ToastFn = ({ severity, message }: ToastContextType) => void;

export const hydrate =
  (dispatch: React.Dispatch<any>) => async (): Promise<void> => {
    dispatch({ type: AUTH.HYDRATESTARTED });
    try {
      const session = await getSession();
      dispatch({
        type: AUTH.HYDRATESUCCESS,
        payload: { user: session?.user },
      });
    } catch (error) {
      dispatch({ type: AUTH.HYDRATEFAILED });
    }
  };

export const logIn =
  (dispatch: React.Dispatch<any>) =>
  async (
    credentials: { email: string; password: string },
    { toast }: { toast: ToastFn }
  ): Promise<void> => {
    try {
      dispatch({ type: AUTH.SIGNINATTEMPTED });
      // log user in
      const response = await signIn(LoginCredentialsEnum.Credentials, {
        ...credentials,
        redirect: false,
      });

      if (response?.error) {
        toast({
          severity: 'error',
          message: response.error,
        });
      }

      if (response?.ok) {
        hydrate(dispatch)();
      }
    } catch (error) {
      dispatch({ type: AUTH.SIGNINFAILED });
    }
  };

export const registerUser =
  (dispatch: React.Dispatch<any>) =>
  async (
    credentials: { email: string; password: string },
    { toast }: { toast: ToastFn }
  ): Promise<void> => {
    dispatch({ type: AUTH.SIGNUPATTEMPTED });
    try {
      const response = await signIn(LoginCredentialsEnum.Register, {
        ...credentials,
        redirect: false,
      });

      if (response?.ok) {
        dispatch({
          type: AUTH.SIGNUPSUCCESS,
        });
        toast({ severity: 'success', message: 'Registration successful!' });
        hydrate(dispatch)();
      } else {
        dispatch({ type: AUTH.SIGNUPFAILED });
        response?.error && handleError(response?.error, toast);
      }
    } catch (error: any) {
      dispatch({ type: AUTH.SIGNUPFAILED });
      toast({ severity: 'error', message: error.message });
    }
  };

export const logOut =
  (dispatch: React.Dispatch<any>) =>
  async ({ toast }: { toast?: ToastFn }): Promise<void> => {
    toast?.({
      severity: 'success',
      message: ' Logged out successfully👋',
    });

    try {
      dispatch({ type: AUTH.SIGNOUTATTEMPTED });
      const logoutResponse = await signOut({ redirect: false });
      if (logoutResponse?.url) {
        dispatch({ type: AUTH.SIGNOUTSUCCESS });
        hydrate(dispatch)();
      }
    } catch (error) {
      dispatch({ type: AUTH.SIGNOUTFAILED });
      throw error;
    }
  };

export const updateSignUpForm =
  (dispatch: React.Dispatch<any>) =>
  async (
    formData: Record<string, any>,
    callback: GenericCallback
  ): Promise<void> => {
    dispatch({ type: AUTH.SIGNUPFORMUPDATED, payload: formData });
    callback();
  };

export const actions = {
  updateSignUpForm,
  hydrate,
  logIn,
  logOut,
  registerUser,
};

export type AuthActionsType = typeof actions;

export type BoundedAuthActionsType = {
  [K in keyof AuthActionsType]: ReturnType<AuthActionsType[K]>;
};

export type AuthContextType = {
  state: Record<string, any>;
} & BoundedAuthActionsType;
export const { Provider, Context } = createDataContext(authReducer, actions, {
  isHydrated: false,
  user: null,
});

type GenericCallback = () => void;

const handleError = (error: string, toast: ToastFn) => {
  switch (error) {
    case 'Email is already in use':
      toast({
        severity: 'error',
        message: 'Email is already in use',
      });
      break;
    case 'Invalid credentials':
      toast({
        severity: 'error',
        message: 'Invalid credentials',
      });
      break;
    default:
      toast({
        severity: 'error',
        message: 'An error occurred',
      });
  }
};
