'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { sequenceWaas, checkAuthStatus } from '../../config/sequence';

export default function Connected() {
  const { address: metamaskAddress, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [sequenceAddress, setSequenceAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { isSignedIn, address } = await checkAuthStatus();
      if (isSignedIn && address) {
        setSequenceAddress(address);
      } else if (!isSignedIn && !isConnected) {
        router.push('/');
      }
    };
    checkAuth();
  }, [isConnected, router]);

  if (!isConnected && !sequenceAddress) {
    return null;
  }

  const handleDisconnect = async () => {
    if (isConnected) {
      disconnect();
    } else if (sequenceAddress) {
      await sequenceWaas.dropSession();
      setSequenceAddress(null);
      router.push('/');
    }
  };

  const displayAddress = metamaskAddress || sequenceAddress;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#1A1A1A] rounded-lg p-8 max-w-md w-full border border-white/10">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Connected Wallet
        </h1>
        <p className="text-center mb-8 font-mono bg-black/50 p-4 rounded break-all">
          {displayAddress}
        </p>
        <button
          onClick={handleDisconnect}
          className="w-full bg-[#2A2A2A] text-white rounded-lg py-3 hover:bg-[#3A3A3A] transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
