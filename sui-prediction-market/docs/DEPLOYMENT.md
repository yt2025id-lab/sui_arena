# 🚀 Deployment Guide

Panduan lengkap untuk deploy Sui Prediction Market ke testnet/mainnet.

## Prerequisites

1. Install Sui CLI:
```bash
# macOS
brew install sui

# Linux
cargo install --locked --git https://github.com/MystenLabs/sui.git --branch mainnet sui
```

2. Setup Sui wallet:
```bash
sui client
```

3. Get testnet SUI tokens:
- Visit [Sui Testnet Faucet](https://discord.com/channels/916379725201563759/1037811694564560967)
- Request tokens in Discord

## Step-by-Step Deployment

### 1. Build the Contracts

```bash
cd move/prediction_market
sui move build
```

Expected output:
```
UPDATING GIT DEPENDENCY https://github.com/MystenLabs/sui.git
INCLUDING DEPENDENCY Sui
INCLUDING DEPENDENCY MoveStdlib
BUILDING prediction_market
```

### 2. Test the Contracts (Optional)

```bash
sui move test
```

### 3. Deploy to Testnet

```bash
sui client publish --gas-budget 100000000
```

**Save these values from output:**
```
Published Objects:
- Package ID: 0x1234... (SAVE THIS!)
- Market Module: prediction_market::market
- AMM Module: prediction_market::amm
```

### 4. Verify Deployment

```bash
sui client object <PACKAGE_ID>
```

### 5. Create Your First Market

```bash
# First, get a coin object ID
sui client gas

# Create market (replace values)
sui client call \
  --package <PACKAGE_ID> \
  --module market \
  --function create_market \
  --args \
    '"Will SUI reach $5 by March 2026?"' \
    '"Prediction market for SUI token price"' \
    '"Crypto"' \
    <COIN_OBJECT_ID> \
    1743465600000 \
    0x6 \
  --gas-budget 10000000
```

**Save the Market ID from output!**

## Common Operations

### Create User Position

Before trading, users need a Position object:

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module amm \
  --function create_user_position \
  --args <MARKET_ID> \
  --gas-budget 10000000
```

### Buy YES Shares

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

### Buy NO Shares

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module amm \
  --function buy_shares \
  --args \
    <MARKET_ID> \
    0 \
    <PAYMENT_COIN_ID> \
    100 \
    <POSITION_ID> \
  --gas-budget 10000000
```

### Sell Shares

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module amm \
  --function sell_shares \
  --args \
    <MARKET_ID> \
    1 \
    500 \
    100 \
    <POSITION_ID> \
  --gas-budget 10000000
```

### Resolve Market

Only the market resolver can do this:

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module market \
  --function resolve_market \
  --args \
    <MARKET_ID> \
    1 \
    0x6 \
  --gas-budget 10000000
```

### Claim Winnings

After market is resolved:

```bash
sui client call \
  --package <PACKAGE_ID> \
  --module amm \
  --function claim_winnings \
  --args \
    <MARKET_ID> \
    <POSITION_ID> \
  --gas-budget 10000000
```

## Querying Data

### Get Market Info

```bash
sui client object <MARKET_ID> --json
```

### Get Position Info

```bash
sui client object <POSITION_ID> --json
```

### Get All Markets

```bash
sui client objects --json | jq '.[] | select(.data.type | contains("Market"))'
```

## Environment Variables

Create `.env` file in frontend:

```bash
NEXT_PUBLIC_SUI_NETWORK=testnet
NEXT_PUBLIC_PACKAGE_ID=<YOUR_PACKAGE_ID>
NEXT_PUBLIC_RPC_URL=https://fullnode.testnet.sui.io:443
```

## Mainnet Deployment

1. Switch to mainnet:
```bash
sui client switch --env mainnet
```

2. Ensure you have enough SUI for gas:
```bash
sui client gas
```

3. Deploy with higher gas budget:
```bash
sui client publish --gas-budget 500000000
```

4. **IMPORTANT**: Save all IDs to secure location!

## Upgrade Strategy

Sui packages are immutable by default. For upgrades:

1. Deploy new package version
2. Migrate users to new contracts
3. Or use upgrade capabilities (advanced)

## Monitoring

### Watch Events

```bash
sui client events --package <PACKAGE_ID>
```

### Track Market Activity

```bash
sui client events --package <PACKAGE_ID> --module market
```

## Troubleshooting

### Error: Insufficient Gas

Solution: Increase `--gas-budget` parameter

### Error: Object Not Found

Solution: Use `sui client objects` to find correct object IDs

### Error: Invalid Argument

Solution: Check argument types and order in function signature

### Error: Unauthorized

Solution: Ensure you're calling from the correct wallet address

## Cost Estimates

Testnet (free):
- Deploy: ~0.5 SUI (from faucet)
- Create Market: ~0.01 SUI
- Buy/Sell: ~0.005 SUI
- Resolve: ~0.005 SUI

Mainnet (estimated):
- Deploy: ~1-2 SUI
- Create Market: ~0.02 SUI
- Buy/Sell: ~0.01 SUI
- Resolve: ~0.01 SUI

## Next Steps

After deployment:
1. Test all functions thoroughly
2. Create sample markets
3. Invite beta testers
4. Monitor gas costs
5. Deploy frontend
6. Set up indexer for events

## Support

- [Sui Discord](https://discord.gg/sui)
- [Sui Developer Docs](https://docs.sui.io/)
- [GitHub Issues](https://github.com/yourusername/sui-prediction-market/issues)
