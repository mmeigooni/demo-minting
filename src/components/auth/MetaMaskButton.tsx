'use client';

import { useConnect, useAccount, useDisconnect } from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { MetaMaskLogo } from '../../connectors/metamask';
import { handleDisconnect, clearExistingSessions } from '../../utils/auth';
import { useRouter } from 'next/navigation';

interface MetaMaskButtonProps {
  onDisconnect: () => void;
}

export default function MetaMaskButton({ onDisconnect }: MetaMaskButtonProps) {
  const { connect, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  const handleMetaMaskClick = async () => {
    try {
      await clearExistingSessions();
      await connect({ connector: metaMask() });
    } catch (error) {
      console.error('MetaMask connection error:', error);
    }
  };

  const handleDisconnectClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    disconnect();
    await handleDisconnect(router);
    onDisconnect();
  };

  return (
    <button
      onClick={handleMetaMaskClick}
      disabled={isPending}
      className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors relative w-full"
    >
      <div className="w-8 h-8 mb-2">
        <MetaMaskLogo className="w-full h-full" />
      </div>
      <span className="text-white text-sm">
        {isConnected
          ? `Connected: ${address?.slice(0, 6)}...${address?.slice(-4)}`
          : isPending
          ? 'Connecting...'
          : 'MetaMask'}
      </span>
      {isConnected && (
        <div
          role="button"
          onClick={handleDisconnectClick}
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
  );
}
