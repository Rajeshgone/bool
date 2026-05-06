'use client';

import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

export const { connectors } = getDefaultWallets({
  appName: 'Base Counter DApp',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get free at https://cloud.reown.com
});
