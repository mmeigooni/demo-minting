import { createConfig, http } from 'wagmi';
import { mainnet, polygon } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [polygon, mainnet],
  transports: {
    [polygon.id]: http(),
    [mainnet.id]: http(),
  },
  connectors: [metaMask()],
});
