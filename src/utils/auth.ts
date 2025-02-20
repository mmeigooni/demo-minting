import { sequenceWaas, checkAuthStatus } from '../config/sequence';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const clearExistingSessions = async () => {
  try {
    const { isSignedIn } = await checkAuthStatus();
    if (!isSignedIn) {
      return;
    }
    const sessions = await sequenceWaas.listSessions();
    if (sessions.length > 0) {
      await Promise.all(
        sessions.map((session) =>
          sequenceWaas.dropSession({ sessionId: session.id })
        )
      );
    }
  } catch (error) {
    console.error('Failed to clear sessions:', error);
    throw error;
  }
};

export const handleDisconnect = async (router: AppRouterInstance) => {
  try {
    const sessions = await sequenceWaas.listSessions();
    if (sessions.length > 0) {
      await sequenceWaas.dropSession({ sessionId: sessions[0].id });
    }
    router.push('/');
  } catch (error) {
    console.error('Failed to disconnect:', error);
    throw error;
  }
};

export const handleGoogleSignIn = async (
  idToken: string,
  router: AppRouterInstance,
  onSuccess?: () => void
) => {
  try {
    await clearExistingSessions();

    const response = await sequenceWaas.signIn(
      {
        idToken: idToken,
      },
      'Web Session'
    );
    console.log('Wallet created:', response.wallet);

    // Add a small delay to ensure the session is established
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { isSignedIn, address } = await checkAuthStatus();
    console.log('Auth status:', { isSignedIn, address });

    if (isSignedIn && address) {
      onSuccess?.();
      router.push('/connected');
      return true;
    }

    console.error('Wallet created but not signed in');
    return false;
  } catch (error) {
    console.error('Google authentication failed:', error);
    throw error;
  }
};

export const handleEmailSignIn = async (
  email: string,
  onOTPRequired: (respondWithCode: (code: string) => Promise<void>) => void
) => {
  try {
    await clearExistingSessions();
    return await sequenceWaas.signIn({ email }, 'Web Session');
  } catch (error) {
    console.error('Email authentication failed:', error);
    throw error;
  }
};

export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
