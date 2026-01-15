# Sui Prediction Market - Frontend

Next.js frontend for the Sui Prediction Market platform.

## Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your PACKAGE_ID

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Required in `.env.local`:

- `NEXT_PUBLIC_SUI_NETWORK` - Network (testnet/mainnet)
- `NEXT_PUBLIC_PACKAGE_ID` - Deployed package ID
- `NEXT_PUBLIC_RPC_URL` - Sui RPC endpoint

## Documentation

See [FRONTEND_GUIDE.md](../docs/FRONTEND_GUIDE.md) for detailed documentation.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- @mysten/dapp-kit (Sui integration)
- @tanstack/react-query
- Zustand (state management)
