'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { MetaMaskLogo } from '../connectors/metamask';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import { sequenceWaas, checkAuthStatus } from '../config/sequence';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CustomGoogleButtonProps {
  onClose: () => void;
}

const CustomGoogleButton = ({ onClose }: CustomGoogleButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      setIsLoading(true);
      const response = await sequenceWaas.signIn(
        {
          idToken: credentialResponse.credential!,
        },
        'Web Session'
      );
      console.log('Wallet created:', response.wallet);
      onClose();
    } catch (error) {
      console.error('Google authentication failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors">
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
      <span className="text-white text-sm mt-2">
        {isLoading ? 'Connecting...' : 'Gmail'}
      </span>
    </div>
  );
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const { connect, connectors, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleMetaMaskClick = async () => {
    try {
      await connect({ connector: metaMask() });
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  };

  const handleEmailSubmit = () => {
    if (isValidEmail(email)) {
      // Handle email submission
      console.log('Email submitted:', email);
    }
  };

  const handleBack = () => {
    setShowEmailInput(false);
    setEmail('');
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-black rounded-lg p-8 max-w-md w-full mx-4 relative transform transition-all duration-300 border border-white/10 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mb-8 text-center">
          Sign in
        </h2>

        <div className="relative">
          <div
            className={`transform transition-all duration-300 ${
              !showEmailInput
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-[-100%] absolute inset-0'
            }`}
          >
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setShowEmailInput(true)}
                className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="w-8 h-8 mb-2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-full h-full"
                  >
                    <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                  </svg>
                </div>
                <span className="text-white text-sm">Email</span>
              </button>

              <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
              >
                <CustomGoogleButton onClose={onClose} />
              </GoogleOAuthProvider>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center mb-8">
              <span className="text-gray-400 text-sm">or select a wallet</span>
            </div>

            {/* Metamask option */}
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={handleMetaMaskClick}
                disabled={isPending}
                className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors relative"
              >
                <div className="w-8 h-8 mb-2">
                  <MetaMaskLogo className="w-full h-full" />
                </div>
                <span className="text-white text-sm">
                  {isConnected
                    ? `Connected: ${address?.slice(0, 6)}...${address?.slice(
                        -4
                      )}`
                    : isPending
                    ? 'Connecting...'
                    : 'MetaMask'}
                </span>
                {isConnected && (
                  <div
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      disconnect();
                    }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div
            className={`transform transition-all duration-300 ${
              showEmailInput
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-[100%] absolute inset-0'
            }`}
          >
            <div className="relative mb-8">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full bg-transparent text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="flex-1 bg-[#1A1A1A] text-white rounded-full py-3 hover:bg-[#2A2A2A] transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleEmailSubmit}
                disabled={!isValidEmail(email)}
                className={`flex-1 rounded-full py-3 transition-colors relative ${
                  isValidEmail(email)
                    ? 'text-white hover:opacity-90'
                    : 'text-[#4B0082] cursor-not-allowed'
                }`}
                style={{
                  background: isValidEmail(email)
                    ? 'linear-gradient(#000, #000) padding-box, linear-gradient(to right, #4B0082, #9400D3) border-box'
                    : undefined,
                  border: isValidEmail(email)
                    ? '2px solid transparent'
                    : '2px solid #4B0082',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
