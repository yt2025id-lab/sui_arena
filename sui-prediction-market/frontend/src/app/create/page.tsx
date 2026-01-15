'use client';

import { Header } from '@/components/Header';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { CATEGORIES } from '@/config/constants';
import { useState } from 'react';

export default function CreateMarketPage() {
  const currentAccount = useCurrentAccount();
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    category: 'Crypto',
    initialLiquidity: '',
    expiryDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement blockchain interaction
    alert('Creating market...');
    console.log('Form data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  if (!currentAccount) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please connect your wallet to create a market
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Create New Market</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Create a binary prediction market on any future event
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question */}
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-2">
                Market Question *
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="e.g., Will SUI reach $5 before March 2026?"
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Make it clear and unambiguous. Should be answerable with YES or NO.
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about the market, resolution criteria, and data sources..."
                rows={4}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Include resolution criteria and reliable data sources.
              </p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              >
                {CATEGORIES.filter(c => c !== 'All').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Liquidity */}
            <div>
              <label htmlFor="initialLiquidity" className="block text-sm font-medium mb-2">
                Initial Liquidity *
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="initialLiquidity"
                  name="initialLiquidity"
                  value={formData.initialLiquidity}
                  onChange={handleChange}
                  placeholder="100"
                  min="10"
                  step="0.1"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                  SUI
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Minimum 10 SUI. Will be split 50/50 between YES and NO pools.
              </p>
            </div>

            {/* Expiry Date */}
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                min={minDateStr}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Date when the market can be resolved. Must be in the future.
              </p>
            </div>

            {/* Info Box */}
            <div className="border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 rounded-lg p-4">
              <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                Important Notes
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• You will be the default resolver for this market</li>
                <li>• Resolution can only happen after expiry date</li>
                <li>• Make sure resolution criteria are clear and objective</li>
                <li>• Initial liquidity cannot be withdrawn</li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Create Market
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
