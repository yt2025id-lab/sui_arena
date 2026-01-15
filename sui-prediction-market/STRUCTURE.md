# 📁 Project Structure

Complete overview of Sui Prediction Market project structure.

## 📂 Directory Tree

```
sui-prediction-market/
├── 📄 README.md                    # Main project documentation
├── 📄 QUICKSTART.md               # 5-minute setup guide
├── 📄 PROJECT_SUMMARY.md          # Executive summary
├── 📄 STRUCTURE.md                # This file
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 move/                       # Sui Move smart contracts
│   └── prediction_market/
│       ├── 📄 Move.toml          # Package configuration
│       ├── 📁 sources/
│       │   ├── 📄 market.move    # Core market logic (450+ LOC)
│       │   └── 📄 amm.move       # AMM trading system (250+ LOC)
│       └── 📁 tests/             # Unit tests (to be implemented)
│
├── 📁 frontend/                   # Next.js frontend application
│   ├── 📄 package.json           # Dependencies
│   ├── 📄 tsconfig.json          # TypeScript config
│   ├── 📄 tailwind.config.ts     # Tailwind CSS config
│   ├── 📄 next.config.js         # Next.js config
│   ├── 📄 postcss.config.js      # PostCSS config
│   ├── 📄 .eslintrc.json         # ESLint config
│   ├── 📄 .env.example           # Environment template
│   ├── 📄 README.md              # Frontend-specific docs
│   │
│   └── 📁 src/
│       ├── 📁 app/               # Next.js App Router pages
│       │   ├── 📄 page.tsx              # Homepage
│       │   ├── 📄 layout.tsx            # Root layout
│       │   ├── 📄 globals.css           # Global styles
│       │   ├── 📄 providers.tsx         # React providers
│       │   │
│       │   ├── 📁 markets/
│       │   │   └── 📄 page.tsx          # Market discovery page
│       │   │
│       │   ├── 📁 market/
│       │   │   └── 📁 [id]/
│       │   │       └── 📄 page.tsx      # Market detail & trading
│       │   │
│       │   ├── 📁 portfolio/
│       │   │   └── 📄 page.tsx          # Portfolio dashboard
│       │   │
│       │   └── 📁 create/
│       │       └── 📄 page.tsx          # Create market form
│       │
│       ├── 📁 components/        # Reusable React components
│       │   ├── 📄 Header.tsx            # Navigation + Wallet
│       │   └── 📄 MarketCard.tsx        # Market preview card
│       │
│       ├── 📁 hooks/             # Custom React hooks (to be implemented)
│       │
│       ├── 📁 lib/               # Utility libraries
│       │   └── 📄 sui-client.ts         # Sui client setup
│       │
│       ├── 📁 types/             # TypeScript type definitions
│       │   └── 📄 index.ts              # Market, Position types
│       │
│       └── 📁 config/            # Configuration
│           └── 📄 constants.ts          # App constants
│
└── 📁 docs/                      # Additional documentation
    ├── 📄 DEPLOYMENT.md          # Smart contract deployment guide
    └── 📄 FRONTEND_GUIDE.md      # Frontend development guide
```

## 📊 File Count Summary

| Category | Count | Total Lines |
|----------|-------|-------------|
| Smart Contracts (.move) | 2 | ~700 |
| Frontend Pages (.tsx) | 7 | ~800 |
| Components (.tsx) | 2 | ~200 |
| Config/Types (.ts) | 4 | ~150 |
| Documentation (.md) | 6 | ~2500 |
| Config files | 7 | ~100 |
| **TOTAL** | **28** | **~4450+** |

## 🎯 Key Files Explained

### Smart Contracts

#### market.move (450+ lines)
**Purpose:** Core market lifecycle and data structures

**Key Components:**
- `Market` struct - Main market object
- `Position` struct - User positions
- `create_market()` - Initialize new market
- `resolve_market()` - Resolve outcome
- Events for tracking activity

**Dependencies:** Sui Framework

#### amm.move (250+ lines)
**Purpose:** Automated Market Maker trading logic

**Key Components:**
- `buy_shares()` - Purchase outcome shares
- `sell_shares()` - Sell shares back
- `claim_winnings()` - Claim after resolution
- Price calculation functions
- Fee handling

**Dependencies:** market.move

### Frontend Application

#### Core Pages

| File | Purpose | Lines | Key Features |
|------|---------|-------|--------------|
| `app/page.tsx` | Homepage | ~150 | Hero, features, stats, how it works |
| `app/markets/page.tsx` | Market discovery | ~120 | Search, filters, market grid |
| `app/market/[id]/page.tsx` | Trading interface | ~250 | Buy/sell, stats, position |
| `app/portfolio/page.tsx` | User dashboard | ~200 | Positions, P&L, history |
| `app/create/page.tsx` | Create market | ~150 | Form with validation |

#### Components

| File | Purpose | Reused In |
|------|---------|-----------|
| `Header.tsx` | Navigation + Wallet | All pages |
| `MarketCard.tsx` | Market preview | Markets page |

#### Configuration

| File | Purpose |
|------|---------|
| `config/constants.ts` | Network, package ID, categories |
| `types/index.ts` | TypeScript interfaces |
| `lib/sui-client.ts` | Sui client initialization |

### Documentation

| File | Target Audience | Purpose |
|------|----------------|---------|
| `README.md` | Everyone | Project overview |
| `QUICKSTART.md` | Developers | 5-min setup |
| `PROJECT_SUMMARY.md` | Stakeholders | Executive summary |
| `docs/DEPLOYMENT.md` | DevOps | Contract deployment |
| `docs/FRONTEND_GUIDE.md` | Frontend devs | UI development |
| `STRUCTURE.md` | New contributors | This file |

## 🔄 Data Flow

```
User Interface (React)
        ↓
  Sui Wallet
        ↓
Transaction Block
        ↓
Smart Contract (market.move / amm.move)
        ↓
Blockchain State
        ↓
Events Emitted
        ↓
UI Updates (React Query)
```

## 🎨 Frontend Architecture

```
App Router (Next.js 14)
        ↓
Providers (React Query + Sui dApp Kit)
        ↓
Pages (TSX Components)
        ↓
Custom Hooks (Data fetching - to be implemented)
        ↓
Sui Client (Blockchain queries)
```

## 📦 Dependencies Map

### Smart Contracts
```
market.move
    └── Sui Framework
        ├── sui::object
        ├── sui::coin
        ├── sui::balance
        └── sui::transfer

amm.move
    ├── market.move
    └── Sui Framework
```

### Frontend
```
Next.js App
    ├── @mysten/dapp-kit (Wallet)
    ├── @mysten/sui.js (Client)
    ├── @tanstack/react-query (Data)
    ├── Tailwind CSS (Styling)
    └── TypeScript (Types)
```

## 🚀 Build Outputs

### Smart Contracts
```
move/prediction_market/build/
├── BuildInfo.yaml
├── bytecode_modules/
│   ├── market.mv
│   └── amm.mv
└── source_maps/
```

### Frontend
```
frontend/.next/
├── cache/
├── server/
└── static/
```

## 📝 Configuration Files

| File | Purpose |
|------|---------|
| `Move.toml` | Sui package config |
| `package.json` | Node dependencies |
| `tsconfig.json` | TypeScript settings |
| `tailwind.config.ts` | Tailwind theme |
| `next.config.js` | Next.js config |
| `.env.local` | Environment vars (not committed) |
| `.gitignore` | Git exclusions |

## 🎯 Import Paths

### Frontend TypeScript Paths
```typescript
// Configured in tsconfig.json
"@/*": ["./src/*"]

// Usage examples:
import { Header } from '@/components/Header';
import { PACKAGE_ID } from '@/config/constants';
import { Market } from '@/types';
```

## 🔍 Finding Things

### "Where is...?"

**Market creation logic?**
- Contract: `move/prediction_market/sources/market.move` (line ~100)
- Frontend: `frontend/src/app/create/page.tsx`

**Trading interface?**
- Contract: `move/prediction_market/sources/amm.move`
- Frontend: `frontend/src/app/market/[id]/page.tsx`

**Wallet connection?**
- Setup: `frontend/src/app/providers.tsx`
- Button: `frontend/src/components/Header.tsx`

**Type definitions?**
- `frontend/src/types/index.ts`

**Constants (categories, outcomes)?**
- `frontend/src/config/constants.ts`

**Deployment guide?**
- `docs/DEPLOYMENT.md`

## 💡 Tips for Navigation

1. **Smart Contracts:** All in `move/prediction_market/sources/`
2. **Pages:** All in `frontend/src/app/`
3. **Reusable UI:** Check `frontend/src/components/`
4. **Documentation:** Start with `README.md`, then dive into `docs/`
5. **Configuration:** Look in root and `frontend/` for config files

## 🆕 Adding New Files

### New Smart Contract Module
```bash
# Create file
touch move/prediction_market/sources/new_module.move

# Add to dependencies if needed in Move.toml
```

### New Frontend Page
```bash
# Create directory and file
mkdir -p frontend/src/app/new-page
touch frontend/src/app/new-page/page.tsx
```

### New Component
```bash
touch frontend/src/components/NewComponent.tsx
```

### New Hook
```bash
mkdir -p frontend/src/hooks
touch frontend/src/hooks/useNewHook.ts
```

## 📐 Code Style

### Move Contracts
- Snake_case for functions: `create_market()`
- PascalCase for structs: `Market`, `Position`
- Constants in CAPS: `STATUS_ACTIVE`

### TypeScript/React
- PascalCase for components: `MarketCard`
- camelCase for functions: `buyShares()`
- CAPS for constants: `PACKAGE_ID`
- Interfaces start with capital: `Market`, `Position`

## 🎓 Learning Path

**For new contributors:**

1. Start: `README.md`
2. Quick setup: `QUICKSTART.md`
3. Smart contracts: `move/prediction_market/sources/market.move`
4. Frontend: `frontend/src/app/page.tsx`
5. Deep dive: `docs/FRONTEND_GUIDE.md`

---

**Last Updated:** January 2026

**Total Project Size:** ~4500 lines of code + documentation
