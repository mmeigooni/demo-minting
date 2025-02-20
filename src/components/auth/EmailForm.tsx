'use client';

import { useState } from 'react';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import { handleEmailSignIn, isValidEmail } from '../../utils/auth';

interface EmailFormProps {
  onBack: () => void;
  onOTPRequired: (respondWithCode: (code: string) => Promise<void>) => void;
}

export default function EmailForm({ onBack, onOTPRequired }: EmailFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) return;

    setIsLoading(true);
    setError(null);

    try {
      await handleEmailSignIn(email, onOTPRequired);
    } catch (error) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <AuthInput
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="Enter email"
      />

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div className="flex gap-4">
        <AuthButton onClick={onBack} variant="secondary">
          Back
        </AuthButton>
        <AuthButton
          onClick={handleSubmit}
          disabled={!isValidEmail(email)}
          isLoading={isLoading}
        >
          Continue
        </AuthButton>
      </div>
    </div>
  );
}
