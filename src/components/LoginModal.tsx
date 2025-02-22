'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { sequenceWaas } from '../config/sequence';
import { useRouter } from 'next/navigation';
import { handleDisconnect } from '../utils/auth';
import { commonStyles } from '../styles/common';
import EmailForm from './auth/EmailForm';
import OTPForm from './auth/OTPForm';
import GoogleSignInButton from './auth/GoogleSignInButton';
import MetaMaskButton from './auth/MetaMaskButton';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [email, setEmail] = useState('');
  const [respondWithCode, setRespondWithCode] = useState<
    ((code: string) => Promise<void>) | null
  >(null);
  const router = useRouter();

  // Set up handlers on mount
  useEffect(() => {
    // Set up email auth code handler
    const authHandler = sequenceWaas.onEmailAuthCodeRequired(
      async (respondWithCode: (code: string) => Promise<void>) => {
        setShowOTPInput(true);
        setRespondWithCode(() => respondWithCode);
      }
    );

    // Set up email conflict handler to always force create
    const conflictHandler = sequenceWaas.onEmailConflict(
      async (_info: unknown, forceCreate: () => Promise<void>) => {
        try {
          await forceCreate(); // Always create new wallet
        } catch (error) {
          console.error('Failed to create account:', error);
        }
      }
    );

    // Clean up both handlers
    return () => {
      authHandler();
      conflictHandler();
    };
  }, []);

  const handleEmailFormBack = () => {
    setShowEmailInput(false);
    setEmail('');
  };

  const handleOTPFormBack = () => {
    setShowOTPInput(false);
    setRespondWithCode(null);
  };

  const handleModalClose = async () => {
    console.log('LoginModal: Closing modal');
    await handleDisconnect(router);
    onClose();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleModalClose();
        }
      }}
    >
      <div className="bg-black rounded-lg p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button onClick={handleModalClose} className={commonStyles.closeButton}>
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
        <h2 className={commonStyles.heading}>Sign in</h2>

        <div className="relative">
          {!showEmailInput ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setShowEmailInput(true)}
                  className={commonStyles.authOptionButton}
                >
                  <div className={commonStyles.iconContainer}>
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

                <GoogleSignInButton onSuccess={onClose} />
              </div>

              <div className={commonStyles.flexCenter + ' mb-8'}>
                <span className="text-gray-400 text-sm">
                  or select a wallet
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <MetaMaskButton onDisconnect={onClose} />
              </div>
            </>
          ) : !showOTPInput ? (
            <EmailForm
              onBack={handleEmailFormBack}
              onOTPRequired={(respondWithCode) => {
                setShowOTPInput(true);
                setRespondWithCode(() => respondWithCode);
              }}
            />
          ) : (
            <OTPForm
              email={email}
              onBack={handleOTPFormBack}
              onSubmit={async (code) => {
                if (respondWithCode) {
                  await respondWithCode(code);
                  onClose();
                  router.push('/connected');
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );

  const portalRoot = document.getElementById('modal-root');
  if (!portalRoot) return null;

  return createPortal(modalContent, portalRoot);
}
