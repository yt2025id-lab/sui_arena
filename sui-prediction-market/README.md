# 🎯 Sui Prediction Market

A decentralized prediction market platform built on Sui blockchain, inspired by Polymarket. Users can create and trade on binary outcome markets (Yes/No) with an automated market maker (AMM) system.

## 🌟 Features

### Phase 1 (MVP) - Current Implementation

#### 1. Binary Prediction Markets (Yes/No Trading)
- Create markets with binary outcomes (Yes/No)
- Automated Market Maker (AMM) using constant product formula
- Real-time odds calculation based on pool ratios
- Buy and sell shares with automatic pricing
- Claim winnings after market resolution
- 0.3% trading fee

#### 2. Market Discovery & Portfolio Dashboard
- Browse all active markets
- Filter by category (Crypto, Politics, Sports, etc.)
- Search markets by keywords
- Track user positions (active trades)
- View trading history
- Calculate profit & loss (P&L)
- Market statistics (volume, participants, expiry)

## 🏗️ Architecture

```
sui-prediction-market/
├── move/                           # Sui Move smart contracts
│   └── prediction_market/
│       ├── sources/
│       │   ├── market.move        # Core market logic & data structures
│       │   └── amm.move           # AMM trading logic
│       ├── tests/
│       └── Move.toml
├── frontend/                       # Next.js frontend (coming soon)
└── docs/                          # Documentation
```

## 📋 Smart Contracts Overview

### market.move
Core module handling market lifecycle and data structures:

**Structs:**
- `Market`: Main market object with pools, metadata, and status
- `Position`: User's position in a specific market
- `MarketCap`: Capability for market management

**Key Functions:**
- `create_market()`: Create new prediction market with initial liquidity
- `resolve_market()`: Resolve market with winning outcome (resolver only)
- `get_market_info()`: Read market details
- `get_market_pools()`: Get YES/NO pool balances

**Events:**
- `MarketCreated`
- `MarketResolved`
- `SharesPurchased`
- `SharesSold`
- `WinningsClaimed`

### amm.move
Automated Market Maker for trading:

**Key Functions:**
- `buy_shares()`: Purchase outcome shares using constant product AMM
- `sell_shares()`: Sell shares back to pool
- `claim_winnings()`: Claim winnings after market resolution
- `get_price()`: Get current price for an outcome (0-10000 basis points)
- `estimate_shares()`: Preview shares for given payment
- `estimate_payout()`: Preview payout for selling shares

**AMM Formula:**
```
shares_out = (target_pool * amount_in) / (source_pool + amount_in)
payout = (source_pool * shares) / (target_pool + shares)
price = (pool / total_pool) * 10000
```

## 🚀 Getting Started

### Prerequisites
- [Sui CLI](https://docs.sui.io/build/install) installed
- Node.js 18+ (for frontend)
- A Sui wallet (for testnet/mainnet deployment)

### Smart Contract Deployment

1. Navigate to the Move package:
```bash
cd move/prediction_market
```

2. Build the contracts:
```bash
sui move build
```

3. Run tests (coming soon):
```bash
sui move test
```

4. Deploy to testnet:
```bash
sui client publish --gas-budget 100000000
```

5. Save the package ID and object IDs from deployment output.

### Using the Smart Contracts

#### Create a Market

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module market \
  --function create_market \
  --args \
    "Will SUI reach $5 before March 2026?" \
    "Binary prediction on SUI token price" \
    "Crypto" \
    <COIN_OBJECT_ID> \
    1743465600000 \
    <CLOCK_OBJECT_ID> \
  --gas-budget 10000000
```

#### Buy YES Shares

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module amm \
  --function buy_shares \
  --args \
    <MARKET_ID> \
    1 \
    <PAYMENT_COIN_ID> \
    100 \
    <POSITION_ID> \
  --gas-budget 10000000
```

#### Resolve Market

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module market \
  --function resolve_market \
  --args \
    <MARKET_ID> \
    1 \
    <CLOCK_OBJECT_ID> \
  --gas-budget 10000000
```

## 💡 How It Works

### Market Creation
1. Creator provides question, description, category, and initial liquidity
2. Initial liquidity is split 50/50 between YES and NO pools
3. Market becomes active and tradeable
4. Creator is set as default resolver

### Trading Mechanism
1. **Buying Shares**: Users pay SUI to receive outcome shares
   - AMM calculates shares using constant product formula
   - Price moves based on pool ratio
   - 0.3% fee applied to each trade

2. **Selling Shares**: Users burn shares to receive SUI
   - AMM calculates payout using reverse formula
   - Pool ratios adjust automatically
   - 0.3% fee applied

3. **Price Discovery**:
   - Price = Pool Size / Total Liquidity
   - Ranges from 0% to 100%
   - Represents market's probability estimate

### Market Resolution
1. After expiry time, resolver can resolve the market
2. Resolver declares winning outcome (YES or NO)
3. Users with winning shares can claim 1 SUI per share
4. Losing shares become worthless

### Example Trade Flow

**Initial State:**
- YES Pool: 1000 SUI
- NO Pool: 1000 SUI
- YES Price: 50% | NO Price: 50%

**User buys 100 SUI of YES:**
- YES Pool: 1100 SUI
- NO Pool: ~917 SUI (AMM adjusted)
- YES Price: 54.5% | NO Price: 45.5%
- User receives ~183 YES shares

**Market Resolves to YES:**
- User claims 183 SUI (183 shares × 1 SUI)
- Profit: 183 - 100 = 83 SUI (83% return)

## 🔧 Technical Details

### AMM Design
- **Constant Product Formula**: Ensures liquidity at all price points
- **No Slippage Protection**: Users set min_shares/min_payout
- **Fee Structure**: 0.3% per trade (industry standard)
- **Price Range**: 0-10000 basis points (0%-100%)

### Security Features
- Market resolver authorization checks
- Active market status validation
- Expiry time enforcement
- Slippage protection via min_shares/min_payout
- Safe math with u128 for intermediate calculations

### Gas Optimization
- Shared objects for markets (multi-user access)
- Minimal storage in Position objects
- Efficient event emission
- Batch operations where possible

## 📊 Market Categories

Supported categories (extensible):
- **Crypto**: Token prices, protocol launches, adoption metrics
- **Politics**: Elections, policies, approval ratings
- **Sports**: Game outcomes, tournament winners
- **Economics**: Inflation, GDP, stock prices
- **Technology**: Product launches, company metrics
- **Entertainment**: Awards, box office, streaming

## 🛣️ Roadmap

### Phase 1 (Current) ✅
- [x] Binary prediction markets
- [x] AMM trading system
- [x] Market creation & resolution
- [x] Position tracking
- [ ] Frontend implementation

### Phase 2 (Next)
- [ ] Order book system (limit orders)
- [ ] Liquidity provider rewards
- [ ] Oracle integration (Pyth/Switchboard)
- [ ] Advanced filtering & search
- [ ] Social features (comments, sharing)

### Phase 3 (Future)
- [ ] Multi-outcome markets (3+ options)
- [ ] Market maker incentives
- [ ] Governance token
- [ ] Mobile app
- [ ] Analytics dashboard
- [ ] API for developers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 🔗 Resources

- [Sui Documentation](https://docs.sui.io/)
- [Sui Move by Example](https://examples.sui.io/)
- [Polymarket](https://polymarket.com/) (Inspiration)
- [Prediction Markets Explained](https://en.wikipedia.org/wiki/Prediction_market)

## ⚠️ Disclaimer

This is experimental software. Use at your own risk. Not financial advice.

---

Built with ❤️ on Sui
