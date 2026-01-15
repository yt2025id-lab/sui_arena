module prediction_market::amm {
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance;
    use sui::object::{Self, ID};
    use prediction_market::market::{Self, Market, Position};
    use sui::transfer;

    // Error codes
    const EInsufficientLiquidity: u64 = 100;
    const EInsufficientShares: u64 = 101;
    const ESlippageTooHigh: u64 = 102;
    const EMarketNotActive: u64 = 103;

    // Constants for AMM calculations
    const OUTCOME_YES: u8 = 1;
    const OUTCOME_NO: u8 = 0;
    const FEE_DENOMINATOR: u64 = 10000; // 0.01% precision
    const TRADING_FEE: u64 = 30; // 0.3% fee (30/10000)

    /// Buy shares for a specific outcome using constant product AMM
    /// Formula: new_price = (pool + payment) / ((pool * other_pool) / (other_pool + shares))
    public entry fun buy_shares(
        market: &mut Market,
        outcome: u8,
        payment: Coin<SUI>,
        min_shares: u64,
        position: &mut Position,
        ctx: &mut TxContext
    ) {
        assert!(market::is_active(market), EMarketNotActive);

        let amount = coin::value(&payment);
        assert!(amount > 0, EInsufficientLiquidity);

        // Calculate fee
        let fee = (amount * TRADING_FEE) / FEE_DENOMINATOR;
        let amount_after_fee = amount - fee;

        // Get current pool sizes
        let (yes_pool, no_pool) = market::get_market_pools(market);

        // Calculate shares to mint using constant product formula
        let shares = if (outcome == OUTCOME_YES) {
            // shares = (yes_pool * amount_after_fee) / (no_pool + amount_after_fee)
            calculate_shares_out(yes_pool, no_pool, amount_after_fee)
        } else {
            // shares = (no_pool * amount_after_fee) / (yes_pool + amount_after_fee)
            calculate_shares_out(no_pool, yes_pool, amount_after_fee)
        };

        assert!(shares >= min_shares, ESlippageTooHigh);

        // Add payment to appropriate pool
        let balance = coin::into_balance(payment);

        if (outcome == OUTCOME_YES) {
            market::add_to_yes_pool(market, balance);
            market::add_yes_shares(position, shares, amount);
        } else {
            market::add_to_no_pool(market, balance);
            market::add_no_shares(position, shares, amount);
        };

        // Emit event
        market::emit_shares_purchased(
            object::id(market),
            tx_context::sender(ctx),
            outcome,
            shares,
            amount
        );
    }

    /// Sell shares back to the pool
    public entry fun sell_shares(
        market: &mut Market,
        outcome: u8,
        shares_to_sell: u64,
        min_payout: u64,
        position: &mut Position,
        ctx: &mut TxContext
    ) {
        assert!(market::is_active(market), EMarketNotActive);
        assert!(shares_to_sell > 0, EInsufficientShares);

        // Get current pool sizes
        let (yes_pool, no_pool) = market::get_market_pools(market);

        // Calculate payout using constant product formula
        let payout = if (outcome == OUTCOME_YES) {
            calculate_payout(yes_pool, no_pool, shares_to_sell)
        } else {
            calculate_payout(no_pool, yes_pool, shares_to_sell)
        };

        // Apply fee
        let fee = (payout * TRADING_FEE) / FEE_DENOMINATOR;
        let payout_after_fee = payout - fee;

        assert!(payout_after_fee >= min_payout, ESlippageTooHigh);

        // Remove shares from position
        if (outcome == OUTCOME_YES) {
            market::remove_yes_shares(position, shares_to_sell);
        } else {
            market::remove_no_shares(position, shares_to_sell);
        };

        // Extract payout from pool
        let payout_balance = if (outcome == OUTCOME_YES) {
            market::remove_from_yes_pool(market, payout_after_fee)
        } else {
            market::remove_from_no_pool(market, payout_after_fee)
        };

        // Transfer payout to seller
        let payout_coin = coin::from_balance(payout_balance, ctx);
        transfer::public_transfer(payout_coin, tx_context::sender(ctx));

        // Emit event
        market::emit_shares_sold(
            object::id(market),
            tx_context::sender(ctx),
            outcome,
            shares_to_sell,
            payout_after_fee
        );
    }

    /// Claim winnings after market is resolved
    public entry fun claim_winnings(
        market: &mut Market,
        position: &mut Position,
        ctx: &mut TxContext
    ) {
        assert!(market::is_resolved(market), 0);

        let winning_outcome_opt = market::get_winning_outcome(market);
        assert!(std::option::is_some(&winning_outcome_opt), 0);

        let winning_outcome = *std::option::borrow(&winning_outcome_opt);
        let (_, yes_shares, no_shares, _) = market::get_position_info(position);

        let winning_shares = if (winning_outcome == OUTCOME_YES) {
            yes_shares
        } else {
            no_shares
        };

        assert!(winning_shares > 0, 0);

        // Each winning share = 1 SUI payout
        let payout = winning_shares;

        // Extract from winning pool
        let payout_balance = if (winning_outcome == OUTCOME_YES) {
            market::remove_from_yes_pool(market, payout)
        } else {
            market::remove_from_no_pool(market, payout)
        };

        // Reset shares
        if (winning_outcome == OUTCOME_YES) {
            market::remove_yes_shares(position, yes_shares);
        } else {
            market::remove_no_shares(position, no_shares);
        };

        // Transfer winnings
        let winnings_coin = coin::from_balance(payout_balance, ctx);
        transfer::public_transfer(winnings_coin, tx_context::sender(ctx));
    }

    /// Calculate shares received for a given payment
    /// Using formula: shares_out = (target_pool * amount_in) / (source_pool + amount_in)
    fun calculate_shares_out(target_pool: u64, source_pool: u64, amount_in: u64): u64 {
        let numerator = (target_pool as u128) * (amount_in as u128);
        let denominator = (source_pool as u128) + (amount_in as u128);
        ((numerator / denominator) as u64)
    }

    /// Calculate payout for selling shares
    /// Using formula: payout = (source_pool * shares) / (target_pool + shares)
    fun calculate_payout(source_pool: u64, target_pool: u64, shares: u64): u64 {
        let numerator = (source_pool as u128) * (shares as u128);
        let denominator = (target_pool as u128) + (shares as u128);
        ((numerator / denominator) as u64)
    }

    /// Get current price for an outcome (in basis points, 0-10000)
    /// Price = (pool / (yes_pool + no_pool)) * 10000
    public fun get_price(market: &Market, outcome: u8): u64 {
        let (yes_pool, no_pool) = market::get_market_pools(market);
        let total_pool = yes_pool + no_pool;

        if (total_pool == 0) {
            return 5000 // 50% if no liquidity
        };

        let pool = if (outcome == OUTCOME_YES) {
            yes_pool
        } else {
            no_pool
        };

        // Return price in basis points (0-10000 = 0%-100%)
        ((pool as u128) * 10000 / (total_pool as u128) as u64)
    }

    /// Calculate estimated shares for a given payment (for UI preview)
    public fun estimate_shares(market: &Market, outcome: u8, payment_amount: u64): u64 {
        let (yes_pool, no_pool) = market::get_market_pools(market);
        let amount_after_fee = payment_amount - ((payment_amount * TRADING_FEE) / FEE_DENOMINATOR);

        if (outcome == OUTCOME_YES) {
            calculate_shares_out(yes_pool, no_pool, amount_after_fee)
        } else {
            calculate_shares_out(no_pool, yes_pool, amount_after_fee)
        }
    }

    /// Calculate estimated payout for selling shares (for UI preview)
    public fun estimate_payout(market: &Market, outcome: u8, shares: u64): u64 {
        let (yes_pool, no_pool) = market::get_market_pools(market);

        let payout = if (outcome == OUTCOME_YES) {
            calculate_payout(yes_pool, no_pool, shares)
        } else {
            calculate_payout(no_pool, yes_pool, shares)
        };

        let fee = (payout * TRADING_FEE) / FEE_DENOMINATOR;
        payout - fee
    }

    /// Create and transfer new position to user
    public entry fun create_user_position(
        market_id: ID,
        ctx: &mut TxContext
    ) {
        let position = market::create_position(market_id, ctx);
        market::transfer_position(position, tx_context::sender(ctx));
    }
}
