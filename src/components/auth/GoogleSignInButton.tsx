'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import { handleGoogleSignIn } from '../../utils/auth';

interface GoogleSignInButtonProps {
  onSuccess: () => void;
}

export default function GoogleSignInButton({
  onSuccess,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error('No credential received');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting Google authentication...');

      await handleGoogleSignIn(
        credentialResponse.credential,
        router,
        onSuccess
      );
    } catch (error) {
      console.error('Google authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors">
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.error('Google Login Failed');
            setIsLoading(false);
          }}
          theme="filled_black"
          size="large"
          type="icon"
          shape="circle"
          useOneTap
        />
      </GoogleOAuthProvider>
      <span className="text-white text-sm mt-2">
        {isLoading ? 'Connecting...' : 'Gmail'}
      </span>
    </div>
  );
}
