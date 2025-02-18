'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { MetaMaskLogo } from '../connectors/metamask';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

              <button className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors">
                <div className="w-8 h-8 mb-2">
                  <svg viewBox="0 0 24 24" className="w-full h-full">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                <span className="text-white text-sm">Gmail</span>
              </button>
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
