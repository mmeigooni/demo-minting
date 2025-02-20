'use client';

interface AuthInputProps {
  type: 'email' | 'text';
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  maxLength?: number;
  className?: string;
  isOTP?: boolean;
}

export default function AuthInput({
  type,
  value,
  onChange,
  placeholder,
  maxLength,
  className = '',
  isOTP = false,
}: AuthInputProps) {
  const baseStyles =
    'w-full bg-transparent text-white border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40';
  const otpStyles = 'text-center text-2xl tracking-wider font-mono';

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => {
        let newValue = e.target.value;
        if (isOTP) {
          newValue = newValue.replace(/[^0-9]/g, '').slice(0, 6);
        }
        onChange(newValue);
      }}
      placeholder={placeholder}
      maxLength={maxLength}
      className={`${baseStyles} ${isOTP ? otpStyles : ''} ${className}`}
    />
  );
}
