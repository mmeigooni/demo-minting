'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import LoginModal from './LoginModal';
import { useRouter } from 'next/navigation';

export default function HomeContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push('/connected');
    }
  }, [isConnected, router]);

  if (isConnected) {
    return null;
  }

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center w-1/2">
        <img
          src="https://assets.website-files.com/6172baee6151547debc65160/6172c483b3cd9b59c1b6744c_Frequency-Logo-2.svg"
          loading="lazy"
          alt="Frequency Logo"
          className="w-full h-auto mb-8"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Login
        </button>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
