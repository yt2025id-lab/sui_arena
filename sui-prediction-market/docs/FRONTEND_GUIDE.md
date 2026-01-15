# 🎨 Frontend Development Guide

Panduan lengkap untuk development dan customization frontend Sui Prediction Market.

## 📁 Struktur Frontend

```
frontend/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx             # Homepage
│   │   ├── markets/page.tsx     # Market discovery
│   │   ├── market/[id]/page.tsx # Market detail & trading
│   │   ├── portfolio/page.tsx   # User portfolio
│   │   ├── create/page.tsx      # Create market
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   └── providers.tsx        # React Query & Sui providers
│   ├── components/              # Reusable components
│   │   ├── Header.tsx           # Navigation header
│   │   └── MarketCard.tsx       # Market display card
│   ├── hooks/                   # Custom React hooks (coming soon)
│   ├── lib/                     # Utility libraries
│   │   └── sui-client.ts        # Sui client configuration
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts             # Market, Position types
│   └── config/                  # Configuration files
│       └── constants.ts         # App constants
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🚀 Getting Started

### Installation

```bash
cd frontend
npm install
```

### Environment Setup

Create `.env.local` file:

```bash
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_PACKAGE_ID=0x... # Your deployed package ID
NEXT_PUBLIC_RPC_URL=https://fullnode.testnet.sui.io:443
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🧩 Key Components

### Header Component

Navigation header with wallet connection:

```tsx
import { Header } from '@/components/Header';

export default function Page() {
  return (
    <div>
      <Header />
      {/* Your content */}
    </div>
  );
}
```

**Features:**
- Logo and navigation links
- Wallet connection button (via @mysten/dapp-kit)
- Responsive design

### MarketCard Component

Display market preview:

```tsx
import { MarketCard } from '@/components/MarketCard';

<MarketCard market={marketData} />
```

**Props:**
- `market: MarketWithPrice` - Market data with pricing

**Features:**
- Category badge
- Question and description
- YES/NO price display
- Volume and expiry stats
- Click to navigate to detail page

## 📱 Pages Overview

### 1. Homepage (`/`)

**Features:**
- Hero section with CTA buttons
- Feature highlights (Fast, AMM, Decentralized)
- Platform statistics
- "How it Works" section

**Customization:**
- Edit hero text in `src/app/page.tsx`
- Update stats with real data from blockchain
- Customize feature cards

### 2. Markets Page (`/markets`)

**Features:**
- Search bar for filtering markets
- Category filter buttons
- Grid layout of market cards
- Empty state when no results

**Data Source:**
Currently using mock data. To integrate real blockchain data:

```tsx
// Replace MOCK_MARKETS with:
import { useMarkets } from '@/hooks/useMarkets';

const { data: markets, isLoading } = useMarkets();
```

### 3. Market Detail Page (`/market/[id]`)

**Features:**
- Full market information
- Trading panel (buy/sell)
- YES/NO outcome selection
- Amount input with estimation
- Your position display
- Market statistics
- Price chart placeholder

**Trading Flow:**
1. User selects outcome (YES/NO)
2. Enters amount to spend
3. Sees estimated shares and fees
4. Clicks "Buy Shares"
5. Wallet prompts for signature
6. Transaction executes on-chain

### 4. Portfolio Page (`/portfolio`)

**Features:**
- Summary statistics (invested, value, P&L)
- Active positions grid
- Trading history table
- Wallet connection check

**Customization:**
- Adjust P&L calculations
- Add filters for positions
- Customize table columns

### 5. Create Market Page (`/create`)

**Features:**
- Form for market creation
- Field validation
- Category selection
- Date picker for expiry
- Important notes section

**Fields:**
- Question (required)
- Description (required)
- Category (dropdown)
- Initial Liquidity (min 10 SUI)
- Expiry Date (future dates only)

## 🎨 Styling with Tailwind

### Theme Configuration

Custom colors in `tailwind.config.ts`:

```ts
colors: {
  yes: {
    light: '#10b981',
    DEFAULT: '#059669',
    dark: '#047857',
  },
  no: {
    light: '#ef4444',
    DEFAULT: '#dc2626',
    dark: '#b91c1c',
  },
}
```

**Usage:**
```tsx
<div className="bg-yes text-white">YES</div>
<div className="bg-no text-white">NO</div>
```

### Dark Mode

Automatic dark mode support via `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-gray-100">Text</p>
</div>
```

## 🔗 Integrating with Sui Blockchain

### Wallet Integration

Using `@mysten/dapp-kit`:

```tsx
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';

function Component() {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  if (!currentAccount) {
    return <div>Connect wallet</div>;
  }

  // Your logic
}
```

### Reading Market Data

```tsx
import { suiClient } from '@/lib/sui-client';

async function getMarket(marketId: string) {
  const market = await suiClient.getObject({
    id: marketId,
    options: {
      showContent: true,
      showType: true,
    },
  });

  return market;
}
```

### Executing Transactions

```tsx
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { PACKAGE_ID } from '@/config/constants';

function buyShares(marketId: string, outcome: number, amount: number) {
  const tx = new TransactionBlock();

  const [coin] = tx.splitCoins(tx.gas, [tx.pure(amount)]);

  tx.moveCall({
    target: `${PACKAGE_ID}::amm::buy_shares`,
    arguments: [
      tx.object(marketId),
      tx.pure(outcome),
      coin,
      tx.pure(minShares),
      tx.object(positionId),
    ],
  });

  signAndExecute({
    transactionBlock: tx,
  });
}
```

## 🪝 Custom Hooks (To Implement)

### useMarkets

Fetch all markets:

```tsx
// src/hooks/useMarkets.ts
import { useQuery } from '@tanstack/react-query';
import { suiClient } from '@/lib/sui-client';

export function useMarkets() {
  return useQuery({
    queryKey: ['markets'],
    queryFn: async () => {
      // Fetch markets from blockchain
      // Parse and return data
    },
  });
}
```

### useMarket

Fetch single market:

```tsx
export function useMarket(marketId: string) {
  return useQuery({
    queryKey: ['market', marketId],
    queryFn: async () => {
      // Fetch market by ID
    },
  });
}
```

### usePosition

Fetch user position:

```tsx
export function usePosition(marketId: string) {
  const account = useCurrentAccount();

  return useQuery({
    queryKey: ['position', marketId, account?.address],
    queryFn: async () => {
      // Fetch position
    },
    enabled: !!account,
  });
}
```

## 📊 State Management

Currently using React hooks. For complex state, consider:

### Zustand Store

```tsx
// src/store/marketStore.ts
import create from 'zustand';

interface MarketStore {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
```

## 🧪 Testing

### Unit Tests (Setup needed)

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### E2E Tests (Setup needed)

```bash
npm install --save-dev @playwright/test
```

## 🎯 Next Steps for Development

1. **Implement Blockchain Integration**
   - Create custom hooks for data fetching
   - Implement transaction execution
   - Add loading states

2. **Add Price Charts**
   - Install charting library (recharts, chart.js)
   - Implement historical price tracking
   - Real-time updates

3. **Improve UX**
   - Add loading skeletons
   - Toast notifications for transactions
   - Error handling

4. **Add Features**
   - Market search with debouncing
   - Favorite markets
   - Share markets on social media
   - Email notifications

5. **Optimize Performance**
   - Image optimization
   - Code splitting
   - Server-side rendering for SEO
   - Caching strategies

## 🐛 Common Issues

### Issue: Wallet not connecting

**Solution:** Check if wallet extension is installed and network matches

### Issue: Transaction failing

**Solution:**
- Verify gas budget is sufficient
- Check object IDs are correct
- Ensure user has enough SUI

### Issue: Data not loading

**Solution:**
- Check RPC URL in .env
- Verify PACKAGE_ID is correct
- Check browser console for errors

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sui dApp Kit](https://sdk.mystenlabs.com/dapp-kit)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)

## 🤝 Contributing

When contributing to frontend:

1. Follow existing code style
2. Use TypeScript types
3. Add JSDoc comments for complex functions
4. Test on both light and dark mode
5. Ensure mobile responsiveness

---

Happy coding! 🚀
