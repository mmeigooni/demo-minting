'use client';

import { ReactNode } from 'react';

interface AuthButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  children: ReactNode;
}

export default function AuthButton({
  onClick,
  disabled = false,
  variant = 'primary',
  isLoading = false,
  children,
}: AuthButtonProps) {
  const baseStyles = 'flex-1 rounded-full py-3 transition-colors';

  const variants = {
    primary: `bg-gradient-to-r from-[#4B0082] to-[#9400D3] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${baseStyles}`,
    secondary: `bg-[#1A1A1A] text-white hover:bg-[#2A2A2A] ${baseStyles}`,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={variants[variant]}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
