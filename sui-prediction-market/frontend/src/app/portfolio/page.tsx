'use client';

import { Header } from '@/components/Header';
import { useCurrentAccount } from '@mysten/dapp-kit';
import Link from 'next/link';

// Mock positions data
const MOCK_POSITIONS = [
  {
    id: '0x1',
    marketId: '0x123',
    question: 'Will SUI reach $5 before March 2026?',
    category: 'Crypto',
    yesShares: 150,
    noShares: 0,
    totalInvested: 100,
    currentValue: 120,
    pnl: 20,
    pnlPercent: 20,
    status: 'active',
  },
  {
    id: '0x2',
    marketId: '0x124',
    question: 'Will Bitcoin ETF be approved in Q1 2026?',
    category: 'Crypto',
    yesShares: 0,
    noShares: 200,
    totalInvested: 150,
    currentValue: 140,
    pnl: -10,
    pnlPercent: -6.7,
    status: 'active',
  },
];

const MOCK_HISTORY = [
  {
    id: '0x1',
    type: 'buy',
    market: 'Will SUI reach $5 before March 2026?',
    outcome: 'YES',
    shares: 150,
    amount: 100,
    timestamp: Date.now() - 86400000,
  },
  {
    id: '0x2',
    type: 'buy',
    market: 'Will Bitcoin ETF be approved in Q1 2026?',
    outcome: 'NO',
    shares: 200,
    amount: 150,
    timestamp: Date.now() - 172800000,
  },
];

export default function PortfolioPage() {
  const currentAccount = useCurrentAccount();

  const totalInvested = MOCK_POSITIONS.reduce((sum, p) => sum + p.totalInvested, 0);
  const totalValue = MOCK_POSITIONS.reduce((sum, p) => sum + p.currentValue, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  if (!currentAccount) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please connect your wallet to view your portfolio
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Portfolio</h1>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Invested</div>
            <div className="text-2xl font-bold">{totalInvested.toFixed(2)} SUI</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Value</div>
            <div className="text-2xl font-bold">{totalValue.toFixed(2)} SUI</div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total P&L</div>
            <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnl >= 0 ? '+' : ''}{totalPnl.toFixed(2)} SUI
            </div>
          </div>
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Return</div>
            <div className={`text-2xl font-bold ${totalPnlPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnlPercent >= 0 ? '+' : ''}{totalPnlPercent.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Active Positions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Active Positions</h2>
          {MOCK_POSITIONS.length === 0 ? (
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">No active positions</p>
              <Link
                href="/markets"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Explore Markets
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {MOCK_POSITIONS.map((position) => (
                <Link
                  key={position.id}
                  href={`/market/${position.marketId}`}
                  className="block border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded mb-2">
                        {position.category}
                      </span>
                      <h3 className="text-lg font-semibold">{position.question}</h3>
                    </div>
                    <div className={`text-right ${position.pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      <div className="text-xl font-bold">
                        {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)} SUI
                      </div>
                      <div className="text-sm">
                        {position.pnlPercent >= 0 ? '+' : ''}{position.pnlPercent.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1">YES Shares</div>
                      <div className="font-semibold">{position.yesShares}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1">NO Shares</div>
                      <div className="font-semibold">{position.noShares}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1">Invested</div>
                      <div className="font-semibold">{position.totalInvested} SUI</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1">Current Value</div>
                      <div className="font-semibold">{position.currentValue} SUI</div>
                    </div>
                    <div>
                      <div className="text-gray-600 dark:text-gray-400 mb-1">Status</div>
                      <div className="font-semibold text-green-600">Active</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Trading History */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Trading History</h2>
          {MOCK_HISTORY.length === 0 ? (
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No trading history</p>
            </div>
          ) : (
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Market
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Outcome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Shares
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {MOCK_HISTORY.map((trade) => (
                    <tr key={trade.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded ${
                          trade.type === 'buy'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium line-clamp-1">{trade.market}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-semibold ${
                          trade.outcome === 'YES' ? 'text-yes' : 'text-no'
                        }`}>
                          {trade.outcome}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{trade.shares}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{trade.amount} SUI</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                        {new Date(trade.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
