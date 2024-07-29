use std::ops::{Add, Mul};
use std::str::FromStr;

use bigdecimal::BigDecimal;

use super::utils::compose;

pub struct MoviePrice {
    base_cost: BigDecimal,
    additional_cost: BigDecimal,
    max_days: u8,
}

impl MoviePrice {
    pub fn new_regular_movie() -> MoviePrice {
        return MoviePrice {
            base_cost: BigDecimal::from_str("2.0").unwrap(),
            additional_cost: BigDecimal::from_str("1.5").unwrap(),
            max_days: 2,
        };
    }
}

pub struct Rent {
    days: u8,
    mp: MoviePrice,
}

impl Rent {
    pub fn new_rent(days: u8, mp: MoviePrice) -> Rent {
        return Rent { days, mp };
    }
}


fn additional_cost_for(r: Rent) -> (BigDecimal, BigDecimal) {
    if r.days > r.mp.max_days {
        let additional = r.days - r.mp.max_days;
        let additional_days = BigDecimal::from(additional);
        let additional_cost = r.mp.additional_cost.mul(additional_days);
        return (additional_cost, r.mp.base_cost);
    }
    return (BigDecimal::from(0), r.mp.base_cost);
}


fn total_price_for(prices: (BigDecimal, BigDecimal)) -> BigDecimal {
    return prices.0.add(prices.1);
}

pub fn price_for(r: Rent) -> BigDecimal {
    return compose(additional_cost_for, total_price_for)(r);
}
