# ⚡ Quick Start Guide

Panduan cepat untuk menjalankan Sui Prediction Market dalam 5 menit!

## 🎯 Apa yang Akan Kita Buat?

Platform prediction market seperti Polymarket di Sui blockchain dengan fitur:
- ✅ Binary prediction markets (Yes/No)
- ✅ AMM trading system
- ✅ Market discovery & portfolio dashboard

## 📋 Prerequisites

Sebelum mulai, pastikan Anda sudah install:

1. **Sui CLI**
   ```bash
   # macOS
   brew install sui

   # Linux
   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch mainnet sui
   ```

2. **Node.js 18+**
   ```bash
   node --version  # Should be 18 or higher
   ```

3. **Sui Wallet**
   - Install [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet) extension
   - Create wallet atau import existing

## 🚀 Step 1: Clone & Setup

```bash
# Clone project (jika dari repository)
git clone <your-repo>
cd sui-prediction-market

# Atau jika sudah ada folder:
cd sui-prediction-market
```

## 🔨 Step 2: Deploy Smart Contracts

### 2.1 Setup Sui Wallet

```bash
# Initialize Sui client
sui client

# Switch to testnet
sui client switch --env testnet

# Get testnet SUI from faucet
# Visit: https://discord.com/channels/916379725201563759/1037811694564560967
```

### 2.2 Build & Deploy

```bash
# Navigate to Move package
cd move/prediction_market

# Build contracts
sui move build

# Deploy to testnet
sui client publish --gas-budget 100000000
```

**IMPORTANT:** Save output!

```
Published Objects:
- Package ID: 0x1234...  👈 SAVE THIS!
```

## 🎨 Step 3: Setup Frontend

### 3.1 Install Dependencies

```bash
# Navigate to frontend
cd ../../frontend

# Install packages
npm install
```

### 3.2 Configure Environment

Create `.env.local`:

```bash
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_PACKAGE_ID=0x1234...  # Your package ID from Step 2
NEXT_PUBLIC_RPC_URL=https://fullnode.testnet.sui.io:443
```

### 3.3 Run Development Server

```bash
npm run dev
```

Open browser: [http://localhost:3000](http://localhost:3000) 🎉

## 🎮 Step 4: Test the Platform

### 4.1 Create Your First Market

**Via Frontend:**
1. Connect wallet (top-right button)
2. Click "Create Market"
3. Fill form:
   - Question: "Will SUI reach $5 before March 2026?"
   - Description: "Based on CoinGecko price data"
   - Category: Crypto
   - Initial Liquidity: 10 SUI
   - Expiry: Select future date
4. Click "Create Market"
5. Approve transaction in wallet

**Via CLI (Alternative):**

```bash
# Get coin object
sui client gas

# Create market
sui client call \
  --package <PACKAGE_ID> \
  --module market \
  --function create_market \
  --args \
    '"Will SUI reach $5 before March 2026?"' \
    '"Binary prediction on SUI price"' \
    '"Crypto"' \
    <COIN_OBJECT_ID> \
    1743465600000 \
    0x6 \
  --gas-budget 10000000
```

### 4.2 Trade on Market

1. Go to "Markets" page
2. Click on your market
3. Select outcome (YES or NO)
4. Enter amount to spend
5. Click "Buy Shares"
6. Approve transaction

### 4.3 Check Portfolio

1. Go to "Portfolio" page
2. See your active positions
3. View P&L and stats

## 📱 What You Built

```
✅ Smart Contracts (Sui Move)
   ├── Market creation & lifecycle
   ├── AMM trading (constant product)
   └── Position management

✅ Frontend (Next.js)
   ├── Homepage with features
   ├── Market discovery & search
   ├── Trading interface
   ├── Portfolio dashboard
   └── Market creation form
```

## 🎯 Quick Commands Reference

### Smart Contract Commands

```bash
# Build contracts
cd move/prediction_market && sui move build

# Deploy
sui client publish --gas-budget 100000000

# Get market info
sui client object <MARKET_ID>

# Resolve market (after expiry)
sui client call \
  --package <PACKAGE_ID> \
  --module market \
  --function resolve_market \
  --args <MARKET_ID> 1 0x6 \
  --gas-budget 10000000
```

### Frontend Commands

```bash
# Development
cd frontend && npm run dev

# Build production
npm run build

# Start production
npm start

# Type check
npm run type-check
```

## 🐛 Common Issues & Solutions

### Issue 1: Sui command not found

```bash
# Reinstall Sui CLI
cargo install --locked --git https://github.com/MystenLabs/sui.git --branch mainnet sui

# Add to PATH
export PATH="$HOME/.cargo/bin:$PATH"
```

### Issue 2: Insufficient gas

```bash
# Request more SUI from faucet
# Discord: https://discord.gg/sui
# Channel: #testnet-faucet
```

### Issue 3: Frontend not loading wallet

- Make sure Sui Wallet extension is installed
- Check if wallet is connected to testnet
- Refresh page and try again

### Issue 4: Transaction failing

- Check gas budget is sufficient
- Verify object IDs are correct
- Make sure you have enough SUI

## 📈 Next Steps

Sekarang Anda sudah punya prediction market yang working! Selanjutnya:

1. **Customize Frontend**
   - Edit colors di `tailwind.config.ts`
   - Add your logo
   - Customize landing page

2. **Add Features**
   - Price charts (recharts, chart.js)
   - Email notifications
   - Social sharing
   - Leaderboard

3. **Integrate Real Data**
   - Replace mock data with blockchain queries
   - Implement custom hooks
   - Add real-time updates

4. **Deploy to Production**
   - Deploy contracts to mainnet
   - Deploy frontend to Vercel/Netlify
   - Set up custom domain

## 📚 Documentation

Untuk informasi lebih detail:

- **Smart Contracts:** See [DEPLOYMENT.md](docs/DEPLOYMENT.md)
- **Frontend:** See [FRONTEND_GUIDE.md](docs/FRONTEND_GUIDE.md)
- **Architecture:** See [README.md](README.md)

## 🆘 Need Help?

- Discord: [Sui Discord](https://discord.gg/sui)
- Docs: [Sui Documentation](https://docs.sui.io/)
- GitHub Issues: Create an issue in this repo

## 🎉 Congratulations!

Anda sekarang punya prediction market platform sendiri di Sui!

Built with ❤️ on Sui blockchain

---

**Time to completion:** ~5-10 minutes ⚡

**Difficulty:** Beginner-friendly 🟢

**What you learned:**
- Sui Move smart contract deployment
- AMM implementation
- Next.js + Sui dApp development
- Wallet integration with @mysten/dapp-kit
