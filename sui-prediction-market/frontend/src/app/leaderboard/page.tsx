'use client';

import { Header } from '@/components/Header';
import { useState } from 'react';

interface Trader {
  rank: number;
  address: string;
  name: string;
  level: number;
  profit: number;
  winRate: number;
  totalBets: number;
  avatar: string;
  badge: string;
  rankColor: string;
}

// Mock data
const mockTraders: Trader[] = [
  { rank: 1, address: '0x1234...5678', name: 'WhaleKing', level: 45, profit: 12345.67, winRate: 89, totalBets: 567, avatar: '🐋', badge: '👑', rankColor: '#FFD700' },
  { rank: 2, address: '0x2345...6789', name: 'DegenQueen', level: 42, profit: 9876.54, winRate: 87, totalBets: 489, avatar: '👸', badge: '💎', rankColor: '#FFD700' },
  { rank: 3, address: '0x3456...7890', name: 'CryptoSage', level: 38, profit: 7564.32, winRate: 84, totalBets: 423, avatar: '🧙', badge: '🥇', rankColor: '#FFD700' },
  { rank: 4, address: '0x4567...8901', name: 'MoonBoi', level: 35, profit: 6543.21, winRate: 82, totalBets: 398, avatar: '🚀', badge: '🥈', rankColor: '#C0C0C0' },
  { rank: 5, address: '0x5678...9012', name: 'DiamondHands', level: 33, profit: 5432.10, winRate: 80, totalBets: 367, avatar: '💎', badge: '🥈', rankColor: '#C0C0C0' },
  { rank: 6, address: '0x6789...0123', name: 'APEstrong', level: 31, profit: 4987.65, winRate: 78, totalBets: 345, avatar: '🦍', badge: '🥉', rankColor: '#CD7F32' },
  { rank: 7, address: '0x7890...1234', name: 'SuiBull', level: 29, profit: 4321.09, winRate: 76, totalBets: 312, avatar: '🐂', badge: '🥉', rankColor: '#CD7F32' },
  { rank: 8, address: '0x8901...2345', name: 'DegenLord', level: 27, profit: 3987.54, winRate: 74, totalBets: 289, avatar: '👹', badge: '⚡', rankColor: '#4CA2FF' },
  { rank: 9, address: '0x9012...3456', name: 'OracleAI', level: 25, profit: 3654.32, winRate: 72, totalBets: 267, avatar: '🤖', badge: '⚡', rankColor: '#4CA2FF' },
  { rank: 10, address: '0x0123...4567', name: 'LuckyApe', level: 23, profit: 3321.98, winRate: 70, totalBets: 245, avatar: '🍀', badge: '⚡', rankColor: '#4CA2FF' },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'all-time'>('all-time');
  const [category, setCategory] = useState<'profit' | 'winrate' | 'volume'>('profit');

  return (
    <div className="min-h-screen bg-gradient-arena">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Top traders competing in the SUI ARENA
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Timeframe Filter */}
          <div className="flex gap-2">
            {(['daily', 'weekly', 'monthly', 'all-time'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                  timeframe === tf
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tf.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            {(['profit', 'winrate', 'volume'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all ${
                  category === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {cat === 'winrate' ? 'Win Rate' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12 grid grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* 2nd Place */}
          <div className="order-1 translate-y-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-all hover:shadow-md">
              <div className="text-3xl font-bold mb-3 text-gray-400">#2</div>
              <div className="text-lg font-bold mb-1 text-gray-900">{mockTraders[1].name}</div>
              <div className="text-sm text-gray-500 mb-3">Level {mockTraders[1].level}</div>
              <div className="text-2xl font-bold text-green-600">+{mockTraders[1].profit} SUI</div>
              <div className="text-sm text-gray-500 mt-1">{mockTraders[1].winRate}% Win Rate</div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="order-2">
            <div className="relative bg-white border-2 border-gray-900 rounded-lg p-6 text-center transition-all hover:shadow-lg">
              <div className="text-4xl font-bold mb-3 text-gray-900">#1</div>
              <div className="text-xl font-bold mb-1 text-gray-900">{mockTraders[0].name}</div>
              <div className="text-sm text-gray-600 mb-3">Level {mockTraders[0].level} - Legend</div>
              <div className="text-3xl font-bold text-green-600">+{mockTraders[0].profit} SUI</div>
              <div className="text-sm text-gray-600 mt-1">{mockTraders[0].winRate}% Win Rate</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="order-3 translate-y-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-all hover:shadow-md">
              <div className="text-3xl font-bold mb-3 text-gray-400">#3</div>
              <div className="text-lg font-bold mb-1 text-gray-900">{mockTraders[2].name}</div>
              <div className="text-sm text-gray-500 mb-3">Level {mockTraders[2].level}</div>
              <div className="text-2xl font-bold text-green-600">+{mockTraders[2].profit} SUI</div>
              <div className="text-sm text-gray-500 mt-1">{mockTraders[2].winRate}% Win Rate</div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 font-semibold text-gray-600 text-sm">
              <div className="col-span-1">Rank</div>
              <div className="col-span-3">Trader</div>
              <div className="col-span-2">Level</div>
              <div className="col-span-2">Profit</div>
              <div className="col-span-2">Win Rate</div>
              <div className="col-span-2">Total Bets</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {mockTraders.map((trader) => (
              <div
                key={trader.rank}
                className={`grid grid-cols-12 gap-4 p-4 transition-all hover:bg-gray-50 cursor-pointer ${
                  trader.rank <= 3 ? 'bg-gray-50' : ''
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    #{trader.rank}
                  </span>
                </div>

                {/* Trader Info */}
                <div className="col-span-3 flex items-center gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {trader.name}
                    </div>
                    <div className="text-xs text-gray-500 font-mono">{trader.address}</div>
                  </div>
                </div>

                {/* Level */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      Level {trader.level}
                    </div>
                    <div className="text-xs text-gray-500">
                      {trader.level > 40 ? 'Legend' : trader.level > 30 ? 'Elite' : trader.level > 20 ? 'Pro' : 'Trader'}
                    </div>
                  </div>
                </div>

                {/* Profit */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      +{trader.profit.toLocaleString()} SUI
                    </div>
                    <div className="text-xs text-gray-500">Total Profit</div>
                  </div>
                </div>

                {/* Win Rate */}
                <div className="col-span-2 flex items-center">
                  <div className="w-full">
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {trader.winRate}%
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-900"
                        style={{ width: `${trader.winRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Total Bets */}
                <div className="col-span-2 flex items-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">{trader.totalBets}</div>
                    <div className="text-xs text-gray-500">Predictions</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rank Section */}
        <div className="mt-8 bg-white border-2 border-gray-900 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-sm text-gray-500">Your Rank</div>
                <div className="text-2xl font-bold text-gray-900">#234</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-xl font-bold text-green-600">+234.5 SUI</div>
                <div className="text-xs text-gray-500">Profit</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">78%</div>
                <div className="text-xs text-gray-500">Win Rate</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">127</div>
                <div className="text-xs text-gray-500">Total Bets</div>
              </div>
            </div>

            <button className="px-6 py-2 bg-gray-900 hover:bg-black text-white rounded-lg font-medium transition-colors">
              View Profile
            </button>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-gray-900 rounded-lg p-6 text-center">
            <div className="text-lg font-bold mb-2 text-gray-900">Top 1 Reward</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">1,000 SUI</div>
            <div className="text-sm text-gray-600">+ Champion NFT Badge</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-lg font-bold mb-2 text-gray-900">Top 10 Reward</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">100 SUI</div>
            <div className="text-sm text-gray-600">+ Elite NFT Badge</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="text-lg font-bold mb-2 text-gray-900">Top 50 Reward</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">20 SUI</div>
            <div className="text-sm text-gray-600">+ Pro NFT Badge</div>
          </div>
        </div>
      </main>
    </div>
  );
}
