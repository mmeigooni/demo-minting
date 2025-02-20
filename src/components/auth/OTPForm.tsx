'use client';

import { useState } from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

interface OTPFormProps {
  email: string;
  onBack: () => void;
  onSubmit: (code: string) => Promise<void>;
}

export default function OTPForm({ email, onBack, onSubmit }: OTPFormProps) {
  const [otp, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(otp);
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-white text-sm">
          Enter the 6-digit verification code sent to
        </p>
        <p className="text-white font-medium mb-6">{email}</p>
      </div>

      <AuthInput
        type="text"
        value={otp}
        onChange={setOTP}
        placeholder="000000"
        maxLength={6}
        isOTP
      />

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div className="flex gap-4 mt-6">
        <AuthButton onClick={onBack} variant="secondary">
          Back
        </AuthButton>
        <AuthButton
          onClick={handleSubmit}
          disabled={otp.length !== 6}
          isLoading={isLoading}
        >
          Verify
        </AuthButton>
      </div>
    </div>
  );
}
