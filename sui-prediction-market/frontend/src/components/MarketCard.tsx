'use client';

import { MarketWithPrice } from '@/types';
import Link from 'next/link';

interface MarketCardProps {
  market: MarketWithPrice;
}

export function MarketCard({ market }: MarketCardProps) {
  const formatPrice = (price: number) => `${price.toFixed(1)}%`;
  const formatVolume = (volume: bigint) => {
    const sui = Number(volume) / 1_000_000_000;
    if (sui >= 1000) return `${(sui / 1000).toFixed(1)}K SUI`;
    return `${sui.toFixed(1)} SUI`;
  };

  const isExpired = Date.now() > Number(market.expiryTime);
  const isResolved = market.status === 1;

  return (
    <Link href={`/market/${market.id}`}>
      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded mb-2">
              {market.category}
            </span>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {market.question}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {market.description}
            </p>
          </div>
          {isResolved && (
            <span className="ml-4 px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
              Resolved
            </span>
          )}
          {!isResolved && isExpired && (
            <span className="ml-4 px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
              Expired
            </span>
          )}
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-yes-light/10 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">YES</div>
            <div className="text-2xl font-bold text-yes">{formatPrice(market.yesPrice)}</div>
          </div>
          <div className="bg-no-light/10 rounded-lg p-3">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">NO</div>
            <div className="text-2xl font-bold text-no">{formatPrice(market.noPrice)}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            Volume: <span className="font-medium">{formatVolume(market.totalVolume)}</span>
          </div>
          <div>
            Expires: <span className="font-medium">
              {new Date(Number(market.expiryTime)).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
