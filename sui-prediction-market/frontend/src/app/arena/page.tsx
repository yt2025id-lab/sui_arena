'use client';

import { Header } from '@/components/Header';
import { LevelProgress } from '@/components/arena/LevelProgress';
import { QuestCard } from '@/components/arena/QuestCard';
import Link from 'next/link';

// Mock data
const mockUserStats = {
  level: 14,
  currentXP: 345,
  maxXP: 500,
  rankName: 'Pro Trader',
  rankColor: '#1A1A1A',
  totalProfit: 234.5,
  winRate: 78,
  totalBets: 127,
  wins: 99,
  rank: 234,
};

const mockQuests = [
  {
    id: '1',
    title: 'Make 3 Predictions',
    description: 'Place bets on 3 different markets today',
    xpReward: 10,
    progress: 3,
    target: 3,
    completed: true,
    difficulty: 'easy' as const,
  },
  {
    id: '2',
    title: 'Win a Bet',
    description: 'Successfully win any prediction',
    xpReward: 25,
    progress: 1,
    target: 1,
    completed: true,
    difficulty: 'easy' as const,
  },
  {
    id: '3',
    title: 'High Roller',
    description: 'Place a bet of 50 SUI or more',
    xpReward: 50,
    progress: 0,
    target: 1,
    completed: false,
    difficulty: 'medium' as const,
  },
];

const mockLeaderboard = [
  { rank: 1, name: 'WhaleKing', profit: 1234.5 },
  { rank: 2, name: 'DegenQueen', profit: 987.3 },
  { rank: 3, name: 'CryptoSage', profit: 756.8 },
];

const mockTrendingMarkets = [
  {
    id: '1',
    question: 'Will SUI reach $5 this week?',
    totalBets: 456,
    volume: 2345,
    yesPrice: 68,
  },
  {
    id: '2',
    question: 'BTC hits $100K in February?',
    totalBets: 789,
    volume: 5678,
    yesPrice: 45,
  },
];

export default function ArenaPage() {
  return (
    <div className="min-h-screen bg-gradient-arena">
      <Header />

      <main className="container mx-auto px-4 py-12 pt-20">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            Arena
          </h1>
          <p className="text-lg text-gray-600">
            Track your performance and compete with other traders
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Profit</div>
            <div className="text-2xl font-semibold text-gray-900">{mockUserStats.totalProfit} SUI</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Win Rate</div>
            <div className="text-2xl font-semibold text-gray-900">{mockUserStats.winRate}%</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Global Rank</div>
            <div className="text-2xl font-semibold text-gray-900">#{mockUserStats.rank}</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Bets</div>
            <div className="text-2xl font-semibold text-gray-900">{mockUserStats.totalBets}</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <LevelProgress
              currentXP={mockUserStats.currentXP}
              level={mockUserStats.level}
              maxXP={mockUserStats.maxXP}
              rankName={mockUserStats.rankName}
              rankColor={mockUserStats.rankColor}
            />

            {/* Daily Quests */}
            <QuestCard quests={mockQuests} />

            {/* Trending Markets */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Trending Markets</h2>

              <div className="space-y-3">
                {mockTrendingMarkets.map((market) => (
                  <Link
                    key={market.id}
                    href={`/market/${market.id}`}
                    className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-2">{market.question}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{market.totalBets} bets</span>
                          <span>{market.volume} SUI</span>
                          <span>YES: {market.yesPrice}%</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg text-sm font-medium transition-colors">
                        Trade
                      </button>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/markets"
                className="mt-4 block text-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                View All Markets →
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Top Traders</h2>

              <div className="space-y-3">
                {mockLeaderboard.map((trader) => (
                  <div
                    key={trader.rank}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                  >
                    <div className="text-lg font-semibold text-gray-400 w-8">#{trader.rank}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{trader.name}</div>
                      <div className="text-sm text-green-600">+{trader.profit} SUI</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/leaderboard"
                className="mt-4 block w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-center font-medium text-gray-900 transition-colors"
              >
                View Full Leaderboard
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>

              <div className="space-y-2">
                <Link
                  href="/markets"
                  className="block w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-lg text-center font-medium transition-colors"
                >
                  Browse Markets
                </Link>
                <Link
                  href="/portfolio"
                  className="block w-full py-2.5 bg-white hover:bg-gray-50 text-gray-900 rounded-lg text-center font-medium border border-gray-200 transition-colors"
                >
                  My Portfolio
                </Link>
                <Link
                  href="/create"
                  className="block w-full py-2.5 bg-white hover:bg-gray-50 text-gray-900 rounded-lg text-center font-medium border border-gray-200 transition-colors"
                >
                  Create Market
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4 text-gray-900">Recent Activity</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-600">✓</span>
                  <span>Won "SUI pump?" +23 SUI</span>
                  <span className="ml-auto text-gray-400">2h ago</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-gray-400">★</span>
                  <span>Unlocked "Hot Streak" badge</span>
                  <span className="ml-auto text-gray-400">5h ago</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-red-600">✗</span>
                  <span>Lost "BTC dip?" -10 SUI</span>
                  <span className="ml-auto text-gray-400">8h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
