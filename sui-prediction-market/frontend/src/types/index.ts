export interface Market {
  id: string;
  question: string;
  description: string;
  category: string;
  creator: string;
  resolver: string;
  yesPool: bigint;
  noPool: bigint;
  status: number;
  winningOutcome?: number;
  expiryTime: bigint;
  createdAt: bigint;
  resolvedAt?: bigint;
}

export interface Position {
  id: string;
  marketId: string;
  owner: string;
  yesShares: bigint;
  noShares: bigint;
  totalInvested: bigint;
}

export interface MarketWithPrice extends Market {
  yesPrice: number;
  noPrice: number;
  totalVolume: bigint;
}

export type Outcome = 0 | 1; // 0 = NO, 1 = YES

export type Category = 'All' | 'Crypto' | 'Politics' | 'Sports' | 'Economics' | 'Technology' | 'Entertainment';
