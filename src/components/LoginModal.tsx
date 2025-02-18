'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

        {!showEmailInput ? (
          <>
            {/* Email and Gmail options */}
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
              <button className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors">
                <div className="w-8 h-8 mb-2">
                  <svg viewBox="0 0 318.6 318.6" className="w-full h-full">
                    <style>
                      {`.st0{fill:#E2761B;stroke:#E2761B;stroke-linecap:round;stroke-linejoin:round}
                    .st1{fill:#E4761B;stroke:#E4761B;stroke-linecap:round;stroke-linejoin:round}
                    .st2{fill:#D7C1B3;stroke:#D7C1B3;stroke-linecap:round;stroke-linejoin:round}
                    .st3{fill:#233447;stroke:#233447;stroke-linecap:round;stroke-linejoin:round}
                    .st4{fill:#CD6116;stroke:#CD6116;stroke-linecap:round;stroke-linejoin:round}
                    .st5{fill:#E4751F;stroke:#E4751F;stroke-linecap:round;stroke-linejoin:round}
                    .st6{fill:#F6851B;stroke:#F6851B;stroke-linecap:round;stroke-linejoin:round}
                    .st7{fill:#C0AD9E;stroke:#C0AD9E;stroke-linecap:round;stroke-linejoin:round}
                    .st8{fill:#161616;stroke:#161616;stroke-linecap:round;stroke-linejoin:round}
                    .st9{fill:#763D16;stroke:#763D16;stroke-linecap:round;stroke-linejoin:round}`}
                    </style>
                    <path
                      className="st0"
                      d="M274.1 35.5l-99.5 73.9L193 65.8z"
                    />
                    <path
                      className="st1"
                      d="M44.4 35.5l98.7 74.6-17.5-44.3zm193.9 171.3l-26.5 40.6 56.7 15.6 16.3-55.3zm-204.4.9L50.1 263l56.7-15.6-26.5-40.6z"
                    />
                    <path
                      className="st1"
                      d="M103.6 138.2l-15.8 23.9 56.3 2.5-2-60.5zm111.3 0l-39-34.8-1.3 61.2 56.2-2.5zM106.8 247.4l33.8-16.5-29.2-22.8zm71.1-16.5l33.9 16.5-4.7-39.3z"
                    />
                    <path
                      className="st2"
                      d="M211.8 247.4l-33.9-16.5 2.7 22.1-.3 9.3zm-105 0l31.5 14.9-.2-9.3 2.5-22.1z"
                    />
                    <path
                      className="st3"
                      d="M138.8 193.5l-28.2-8.3 19.9-9.1zm40.9 0l8.3-17.4 20 9.1z"
                    />
                    <path
                      className="st4"
                      d="M106.8 247.4l4.8-40.6-31.3.9zm95.4-40.6l4.8 40.6 26.5-39.7zm23-44.7l-56.2 2.5 5.2 28.9 8.3-17.4 20 9.1zm-120.5 23.1l20-9.1 8.2 17.4 5.3-28.9-56.3-2.5z"
                    />
                    <path
                      className="st5"
                      d="M87.8 162.1l23.6 46 .5-22.9zm120.3 23.1l-1 22.9 23.7-46zm-64-20.6l-5.3 28.9 6.6 34.1 1.5-44.9zm30.5 0l-2.7 18 1.2 45 6.7-34.1z"
                    />
                    <path
                      className="st6"
                      d="M179.8 193.5l-6.7 34.1 4.8 3.3 29.2-22.8 1-22.9zm-69.2-8.3l.8 22.9 29.2 22.8 4.8-3.3-6.6-34.1z"
                    />
                    <path
                      className="st7"
                      d="M180.3 262.3l.3-9.3-2.5-2.2h-37.7l-2.3 2.2.2 9.3-31.5-14.9 11 9 22.3 15.5h38.3l22.4-15.5 11-9z"
                    />
                    <path
                      className="st8"
                      d="M177.9 230.9l-4.8-3.3h-27.7l-4.8 3.3-2.5 22.1 2.3-2.2h37.7l2.5 2.2z"
                    />
                    <path
                      className="st9"
                      d="M278.3 114.2l8.5-40.8-12.7-37.9-96.2 71.4 37 31.3 52.3 15.3 11.6-13.5-5-3.6 8-7.3-6.2-4.8 8-6.1zM31.8 73.4l8.5 40.8-5.4 4 8 6.1-6.1 4.8 8 7.3-5 3.6 11.5 13.5 52.3-15.3 37-31.3-96.2-71.4z"
                    />
                    <path
                      className="st6"
                      d="M267.2 153.5l-52.3-15.3 15.9 23.9-23.7 46 31.2-.4h46.5zm-163.6-15.3l-52.3 15.3-17.4 54.2h46.4l31.1.4-23.6-46zm71 26.4l3.3-57.7 15.2-41.1h-67.5l15 41.1 3.5 57.7 1.2 18.2.1 44.8h27.7l.2-44.8z"
                    />
                  </svg>
                </div>
                <span className="text-white text-sm">MetaMask</span>
              </button>
            </div>
          </>
        ) : (
          <div className="mt-4">
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
        )}
      </div>
    </div>
  );
}
