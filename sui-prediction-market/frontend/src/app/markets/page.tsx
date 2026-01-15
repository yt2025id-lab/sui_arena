'use client';

import { Header } from '@/components/Header';
import { MarketCard } from '@/components/MarketCard';
import { CATEGORIES } from '@/config/constants';
import { MarketWithPrice } from '@/types';
import { useState } from 'react';

// Mock data - replace with real data from blockchain
const MOCK_MARKETS: MarketWithPrice[] = [
  {
    id: '0x123',
    question: 'Will SUI reach $5 before March 2026?',
    description: 'Binary prediction on SUI token price reaching $5 USD before the end of March 2026',
    category: 'Crypto',
    creator: '0xabc',
    resolver: '0xabc',
    yesPool: BigInt(1000_000_000_000),
    noPool: BigInt(800_000_000_000),
    status: 0,
    expiryTime: BigInt(1743465600000),
    createdAt: BigInt(Date.now() - 86400000),
    yesPrice: 55.6,
    noPrice: 44.4,
    totalVolume: BigInt(1800_000_000_000),
  },
  {
    id: '0x124',
    question: 'Will Bitcoin ETF be approved in Q1 2026?',
    description: 'Prediction on whether a Bitcoin spot ETF will be approved by SEC in Q1 2026',
    category: 'Crypto',
    creator: '0xdef',
    resolver: '0xdef',
    yesPool: BigInt(500_000_000_000),
    noPool: BigInt(500_000_000_000),
    status: 0,
    expiryTime: BigInt(1743465600000),
    createdAt: BigInt(Date.now() - 172800000),
    yesPrice: 50.0,
    noPrice: 50.0,
    totalVolume: BigInt(1000_000_000_000),
  },
];

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMarkets = MOCK_MARKETS.filter(market => {
    const matchesCategory = selectedCategory === 'All' || market.category === selectedCategory;
    const matchesSearch = market.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Explore Markets</h1>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Markets Grid */}
        {filteredMarkets.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">No markets found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Try adjusting your filters or create a new market
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
