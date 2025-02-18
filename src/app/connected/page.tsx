'use client';

import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Connected() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  return (
    <div>
      <h1>You are connected</h1>
      <p>{address}</p>
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
