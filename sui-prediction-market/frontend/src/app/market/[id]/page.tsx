'use client';

import { Header } from '@/components/Header';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { OUTCOME } from '@/config/constants';

// Mock market data
const MOCK_MARKET = {
  id: '0x123',
  question: 'Will SUI reach $5 before March 2026?',
  description: 'Binary prediction on SUI token price reaching $5 USD before the end of March 2026. Resolution will be based on CoinGecko data.',
  category: 'Crypto',
  creator: '0xabc...def',
  resolver: '0xabc...def',
  yesPool: BigInt(1000_000_000_000),
  noPool: BigInt(800_000_000_000),
  status: 0,
  expiryTime: BigInt(1743465600000),
  createdAt: BigInt(Date.now() - 86400000),
  yesPrice: 55.6,
  noPrice: 44.4,
  totalVolume: BigInt(1800_000_000_000),
};

export default function MarketDetailPage() {
  const params = useParams();
  const [selectedOutcome, setSelectedOutcome] = useState<number>(OUTCOME.YES);
  const [amount, setAmount] = useState('');
  const [isBuying, setIsBuying] = useState(true);

  const formatPrice = (price: number) => `${price.toFixed(1)}%`;
  const formatVolume = (volume: bigint) => {
    const sui = Number(volume) / 1_000_000_000;
    if (sui >= 1000) return `${(sui / 1000).toFixed(1)}K SUI`;
    return `${sui.toFixed(1)} SUI`;
  };

  const estimatedShares = amount ? (Number(amount) * 0.9).toFixed(2) : '0';
  const estimatedPayout = amount ? (Number(amount) * 0.95).toFixed(2) : '0';

  const handleTrade = () => {
    // TODO: Implement actual blockchain interaction
    alert(`${isBuying ? 'Buying' : 'Selling'} ${amount} SUI of ${selectedOutcome === OUTCOME.YES ? 'YES' : 'NO'} shares`);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Info - Left Column */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded mb-4">
              {MOCK_MARKET.category}
            </span>

            {/* Question */}
            <h1 className="text-3xl font-bold mb-4">{MOCK_MARKET.question}</h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {MOCK_MARKET.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Volume</div>
                <div className="text-xl font-bold">{formatVolume(MOCK_MARKET.totalVolume)}</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">YES Pool</div>
                <div className="text-xl font-bold">{formatVolume(MOCK_MARKET.yesPool)}</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">NO Pool</div>
                <div className="text-xl font-bold">{formatVolume(MOCK_MARKET.noPool)}</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expires</div>
                <div className="text-xl font-bold">
                  {new Date(Number(MOCK_MARKET.expiryTime)).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Price Chart Placeholder */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Price History</h2>
              <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">
                <p className="text-gray-500">Chart coming soon</p>
              </div>
            </div>

            {/* Market Details */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Market Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Creator</span>
                  <span className="font-mono">{MOCK_MARKET.creator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Resolver</span>
                  <span className="font-mono">{MOCK_MARKET.resolver}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Created</span>
                  <span>{new Date(Number(MOCK_MARKET.createdAt)).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Status</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Panel - Right Column */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Trade</h2>

              {/* Buy/Sell Toggle */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setIsBuying(true)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    isBuying
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setIsBuying(false)}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    !isBuying
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Outcome Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Outcome</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedOutcome(OUTCOME.YES)}
                    className={`py-3 rounded-lg font-medium transition-colors ${
                      selectedOutcome === OUTCOME.YES
                        ? 'bg-yes text-white'
                        : 'bg-yes-light/10 text-yes hover:bg-yes-light/20'
                    }`}
                  >
                    YES {formatPrice(MOCK_MARKET.yesPrice)}
                  </button>
                  <button
                    onClick={() => setSelectedOutcome(OUTCOME.NO)}
                    className={`py-3 rounded-lg font-medium transition-colors ${
                      selectedOutcome === OUTCOME.NO
                        ? 'bg-no text-white'
                        : 'bg-no-light/10 text-no hover:bg-no-light/20'
                    }`}
                  >
                    NO {formatPrice(MOCK_MARKET.noPrice)}
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  {isBuying ? 'Amount to spend' : 'Shares to sell'}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                    SUI
                  </span>
                </div>
              </div>

              {/* Estimation */}
              <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isBuying ? 'Estimated shares' : 'Estimated payout'}
                  </span>
                  <span className="font-medium">
                    {isBuying ? estimatedShares : estimatedPayout} {isBuying ? 'shares' : 'SUI'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Trading fee (0.3%)</span>
                  <span className="font-medium">
                    {amount ? (Number(amount) * 0.003).toFixed(4) : '0'} SUI
                  </span>
                </div>
              </div>

              {/* Trade Button */}
              <button
                onClick={handleTrade}
                disabled={!amount || Number(amount) <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
              >
                {isBuying ? 'Buy Shares' : 'Sell Shares'}
              </button>

              {/* Your Position */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-3">Your Position</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">YES Shares</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">NO Shares</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400">Total Invested</span>
                    <span className="font-medium">0 SUI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">P&L</span>
                    <span className="font-medium text-green-600">+0 SUI (0%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
