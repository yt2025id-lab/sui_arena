bisakah module prediction_market::market {
    use sui::object::{Self, UID, ID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use std::string::{Self, String};
    use sui::clock::{Self, Clock};

    // Error codes
    const EMarketNotActive: u64 = 1;
    const EMarketAlreadyResolved: u64 = 2;
    const EMarketNotResolved: u64 = 3;
    const EUnauthorized: u64 = 4;
    const EInvalidOutcome: u64 = 5;
    const EMarketExpired: u64 = 6;
    const EMarketNotExpired: u64 = 7;

    // Market status
    const STATUS_ACTIVE: u8 = 0;
    const STATUS_RESOLVED: u8 = 1;
    const STATUS_CANCELLED: u8 = 2;

    // Outcomes
    const OUTCOME_YES: u8 = 1;
    const OUTCOME_NO: u8 = 0;

    /// Main market struct
    public struct Market has key, store {
        id: UID,
        /// Market question/title
        question: String,
        /// Market description
        description: String,
        /// Category (e.g., "Crypto", "Politics", "Sports")
        category: String,
        /// Creator address
        creator: address,
        /// Market resolver (can resolve outcome)
        resolver: address,
        /// Total YES shares in pool
        yes_pool: Balance<SUI>,
        /// Total NO shares in pool
        no_pool: Balance<SUI>,
        /// Market status
        status: u8,
        /// Winning outcome (0 = NO, 1 = YES, set when resolved)
        winning_outcome: Option<u8>,
        /// Expiry timestamp (milliseconds)
        expiry_time: u64,
        /// Creation timestamp
        created_at: u64,
        /// Resolution timestamp
        resolved_at: Option<u64>,
    }

    /// User position in a market
    public struct Position has key, store {
        id: UID,
        /// Market ID this position belongs to
        market_id: ID,
        /// Owner address
        owner: address,
        /// YES shares owned
        yes_shares: u64,
        /// NO shares owned
        no_shares: u64,
        /// Total investment (for P&L calculation)
        total_invested: u64,
    }

    /// Capability for market management
    public struct MarketCap has key, store {
        id: UID,
        market_id: ID,
    }

    // Events
    public struct MarketCreated has copy, drop {
        market_id: ID,
        question: String,
        category: String,
        creator: address,
        expiry_time: u64,
    }

    public struct MarketResolved has copy, drop {
        market_id: ID,
        winning_outcome: u8,
        resolver: address,
        timestamp: u64,
    }

    public struct SharesPurchased has copy, drop {
        market_id: ID,
        buyer: address,
        outcome: u8,
        shares: u64,
        cost: u64,
    }

    public struct SharesSold has copy, drop {
        market_id: ID,
        seller: address,
        outcome: u8,
        shares: u64,
        payout: u64,
    }

    public struct WinningsClaimed has copy, drop {
        market_id: ID,
        claimer: address,
        amount: u64,
    }

    /// Create a new prediction market
    public entry fun create_market(
        question: vector<u8>,
        description: vector<u8>,
        category: vector<u8>,
        initial_liquidity: Coin<SUI>,
        expiry_time: u64,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        let current_time = clock::timestamp_ms(clock);

        // Split initial liquidity equally between YES and NO pools
        let total = coin::value(&initial_liquidity);
        let half = total / 2;

        let balance = coin::into_balance(initial_liquidity);
        let yes_balance = balance::split(&mut balance, half);
        let no_balance = balance;

        let market_uid = object::new(ctx);
        let market_id = object::uid_to_inner(&market_uid);

        let market = Market {
            id: market_uid,
            question: string::utf8(question),
            description: string::utf8(description),
            category: string::utf8(category),
            creator: sender,
            resolver: sender, // Creator is default resolver
            yes_pool: yes_balance,
            no_pool: no_balance,
            status: STATUS_ACTIVE,
            winning_outcome: std::option::none(),
            expiry_time,
            created_at: current_time,
            resolved_at: std::option::none(),
        };

        event::emit(MarketCreated {
            market_id,
            question: market.question,
            category: market.category,
            creator: sender,
            expiry_time,
        });

        transfer::share_object(market);
    }

    /// Resolve market with winning outcome
    public entry fun resolve_market(
        market: &mut Market,
        winning_outcome: u8,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        let sender = tx_context::sender(ctx);
        assert!(sender == market.resolver, EUnauthorized);
        assert!(market.status == STATUS_ACTIVE, EMarketNotActive);
        assert!(winning_outcome == OUTCOME_YES || winning_outcome == OUTCOME_NO, EInvalidOutcome);

        let current_time = clock::timestamp_ms(clock);
        assert!(current_time >= market.expiry_time, EMarketNotExpired);

        market.status = STATUS_RESOLVED;
        market.winning_outcome = std::option::some(winning_outcome);
        market.resolved_at = std::option::some(current_time);

        event::emit(MarketResolved {
            market_id: object::uid_to_inner(&market.id),
            winning_outcome,
            resolver: sender,
            timestamp: current_time,
        });
    }

    /// Create a new position
    public fun create_position(
        market_id: ID,
        ctx: &mut TxContext
    ): Position {
        Position {
            id: object::new(ctx),
            market_id,
            owner: tx_context::sender(ctx),
            yes_shares: 0,
            no_shares: 0,
            total_invested: 0,
        }
    }

    /// Get market details (for reading)
    public fun get_market_info(market: &Market): (String, String, String, u8, u64, u64) {
        (
            market.question,
            market.description,
            market.category,
            market.status,
            market.expiry_time,
            market.created_at
        )
    }

    /// Get market pools
    public fun get_market_pools(market: &Market): (u64, u64) {
        (
            balance::value(&market.yes_pool),
            balance::value(&market.no_pool)
        )
    }

    /// Get position details
    public fun get_position_info(position: &Position): (ID, u64, u64, u64) {
        (
            position.market_id,
            position.yes_shares,
            position.no_shares,
            position.total_invested
        )
    }

    /// Check if market is active
    public fun is_active(market: &Market): bool {
        market.status == STATUS_ACTIVE
    }

    /// Check if market is resolved
    public fun is_resolved(market: &Market): bool {
        market.status == STATUS_RESOLVED
    }

    /// Get winning outcome (if resolved)
    public fun get_winning_outcome(market: &Market): Option<u8> {
        market.winning_outcome
    }

    // Accessor functions for Position
    public fun add_yes_shares(position: &mut Position, shares: u64, cost: u64) {
        position.yes_shares = position.yes_shares + shares;
        position.total_invested = position.total_invested + cost;
    }

    public fun add_no_shares(position: &mut Position, shares: u64, cost: u64) {
        position.no_shares = position.no_shares + shares;
        position.total_invested = position.total_invested + cost;
    }

    public fun remove_yes_shares(position: &mut Position, shares: u64) {
        assert!(position.yes_shares >= shares, 0);
        position.yes_shares = position.yes_shares - shares;
    }

    public fun remove_no_shares(position: &mut Position, shares: u64) {
        assert!(position.no_shares >= shares, 0);
        position.no_shares = position.no_shares - shares;
    }

    // Accessor functions for Market pools
    public fun add_to_yes_pool(market: &mut Market, balance: Balance<SUI>) {
        balance::join(&mut market.yes_pool, balance);
    }

    public fun add_to_no_pool(market: &mut Market, balance: Balance<SUI>) {
        balance::join(&mut market.no_pool, balance);
    }

    public fun remove_from_yes_pool(market: &mut Market, amount: u64): Balance<SUI> {
        balance::split(&mut market.yes_pool, amount)
    }

    public fun remove_from_no_pool(market: &mut Market, amount: u64): Balance<SUI> {
        balance::split(&mut market.no_pool, amount)
    }

    public fun emit_shares_purchased(market_id: ID, buyer: address, outcome: u8, shares: u64, cost: u64) {
        event::emit(SharesPurchased {
            market_id,
            buyer,
            outcome,
            shares,
            cost,
        });
    }

    public fun emit_shares_sold(market_id: ID, seller: address, outcome: u8, shares: u64, payout: u64) {
        event::emit(SharesSold {
            market_id,
            seller,
            outcome,
            shares,
            payout,
        });
    }

    public fun transfer_position(position: Position, recipient: address) {
        transfer::transfer(position, recipient);
    }
}
