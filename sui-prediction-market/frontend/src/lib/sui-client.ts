import { SuiClient } from '@mysten/sui.js/client';
import { NETWORK, RPC_URL } from '@/config/constants';

export const suiClient = new SuiClient({ url: RPC_URL });

export function getExplorerUrl(type: 'object' | 'txblock' | 'address', id: string): string {
  const baseUrl = NETWORK === 'mainnet'
    ? 'https://suiscan.xyz/mainnet'
    : 'https://suiscan.xyz/testnet';

  return `${baseUrl}/${type}/${id}`;
}
