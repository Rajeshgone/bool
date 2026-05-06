'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { parseAbi } from 'viem';

const COUNTER_ABI = parseAbi([
  'function count() view returns (uint256)',
  'function increment()',
  'function decrement()',
  'function reset()',
]);

export default function Home() {
  const { address, isConnected, chain } = useAccount();
  const [contractAddress, setContractAddress] = useState('0xYourDeployedContractAddressHere');

  const { data: count, refetch } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: COUNTER_ABI,
    functionName: 'count',
  });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const increment = () => writeContract({
    address: contractAddress as `0x${string}`,
    abi: COUNTER_ABI,
    functionName: 'increment',
  });

  const decrement = () => writeContract({
    address: contractAddress as `0x${string}`,
    abi: COUNTER_ABI,
    functionName: 'decrement',
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-5xl font-bold mb-2 text-center">Base Counter</h1>
        <p className="text-center text-gray-400 mb-8">A simple DApp on Base</p>

        <div className="bg-gray-900 rounded-3xl p-8 shadow-xl">
          <div className="flex justify-center mb-8">
            <ConnectButton />
          </div>

          {isConnected && (
            <>
              <div className="text-center mb-8">
                <p className="text-gray-400 text-sm">Current Count</p>
                <p className="text-7xl font-mono font-bold text-emerald-400 mt-2">{count?.toString() || '0'}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={decrement}
                  disabled={isPending || isConfirming}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-semibold disabled:opacity-50"
                >
                  Decrement
                </button>
                <button
                  onClick={increment}
                  disabled={isPending || isConfirming}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-4 rounded-2xl font-semibold disabled:opacity-50"
                >
                  Increment
                </button>
              </div>

              <p className="text-center text-xs text-gray-500 mt-6">
                Network: {chain?.name}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
