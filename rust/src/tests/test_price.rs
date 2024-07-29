use std::str::FromStr;

use bigdecimal::BigDecimal;

use crate::price::MoviePrice;
use crate::price::price_for;
use crate::price::Rent;

#[test]
fn test_rent_regular_movie_for_one_day() {
    let movie: MoviePrice = MoviePrice::new_regular_movie();
    let rent: Rent = Rent::new_rent(1, movie);

    let actual: BigDecimal = price_for(rent);

    assert_eq!(actual, BigDecimal::from_str("2.0").unwrap());
}

#[test]
fn test_rent_regular_movie_for_four_days() {
    let movie: MoviePrice = MoviePrice::new_regular_movie();
    let rent: Rent = Rent::new_rent(4, movie);

    let actual: BigDecimal = price_for(rent);

    assert_eq!(actual, BigDecimal::from_str("5.0").unwrap());
}