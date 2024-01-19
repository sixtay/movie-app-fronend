import { LinearProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {
  ComponentProps,
  ComponentType,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { Context as AuthContext, AuthContextType } from '@/context/auth';

export interface WithAuthOptions {
  shouldRedirect?: boolean;
  redirectToPath?: string;
  redirectIfUserIsAuthenticated?: boolean;
  redirectIfUserIsVerified?: boolean;
}

export function withAuth<Props>({
  shouldRedirect = true,
  redirectIfUserIsAuthenticated = false,
}: WithAuthOptions = {}): (
  WrappedComponent: ComponentType<Props>
) => ComponentType<Props> {
  const defaultRedirectPath = redirectIfUserIsAuthenticated
    ? '/movies'
    : '/login';

  return (
    WrappedComponent: ComponentType<Props & ComponentProps<any>>
  ): ComponentType<Props> => {
    const WithAuthWrapper = (props: Props) => {
      const router = useRouter();
      const { state, hydrate } = useContext<AuthContextType>(AuthContext);
      const { isHydrated, user, sessionUpdatedAt } = state;

      const { data: sessionData, status: sessionStatus } = useSession();
      const isLoadingSession = useMemo(
        () => sessionStatus === 'loading',
        [sessionStatus]
      );

      useEffect(() => {
        if (!isLoadingSession && sessionData !== undefined) {
          hydrate();
        }
      }, [isLoadingSession, sessionUpdatedAt]);

      const isRedirectConditionMet = useMemo(() => {
        if (!isHydrated) return false;
        return (
          isHydrated && Boolean(redirectIfUserIsAuthenticated) === Boolean(user)
        );
      }, [isHydrated, user]);

      const redirectPath = useMemo(() => {
        return defaultRedirectPath;
      }, [user]);

      useEffect(() => {
        if (shouldRedirect && isRedirectConditionMet) {
          void router.replace(redirectPath);
        }
      }, [isRedirectConditionMet, router, redirectPath]);

      if (!isHydrated || isRedirectConditionMet) {
        return <LinearProgress />;
      }

      return <WrappedComponent {...props} />;
    };

    return WithAuthWrapper;
  };
}
