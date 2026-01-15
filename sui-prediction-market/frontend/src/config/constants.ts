export const NETWORK = (process.env.NEXT_PUBLIC_SUI_NETWORK as 'testnet' | 'mainnet') || 'testnet';
export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID || '';
export const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://fullnode.testnet.sui.io:443';

export const MODULE_NAMES = {
  MARKET: 'market',
  AMM: 'amm',
} as const;

export const OUTCOME = {
  NO: 0,
  YES: 1,
} as const;

export const MARKET_STATUS = {
  ACTIVE: 0,
  RESOLVED: 1,
  CANCELLED: 2,
} as const;

export const CATEGORIES = [
  'All',
  'Crypto',
  'Politics',
  'Sports',
  'Economics',
  'Technology',
  'Entertainment',
] as const;
