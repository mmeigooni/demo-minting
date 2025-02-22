'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '../config/wallet';
import ClientPortalProvider from '../components/ClientPortalProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ClientPortalProvider>{children}</ClientPortalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
