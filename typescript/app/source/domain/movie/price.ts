import {MoviePrices, Rental} from "./movie";

const additionalCostFor = (rental: Rental): MoviePrices => {
    let additionalCost = 0.0;
    if (rental.rentalDays > rental.m.minRentDays()) {
        const additionalDays = rental.rentalDays - rental.m.minRentDays()
        additionalCost = rental.m.additionaCostPerDay() * additionalDays;
    }
    return new MoviePrices(additionalCost, rental.m.price());
}

const priceFor = (moviePrices: MoviePrices): number => {
    return moviePrices.movieBasePrice + moviePrices.additionalCost
};

export const compose = <TX,TY,R>(
    f: (x: TX) => TY,
    g: (y: TY) => R):
    (x: TX) => R => {
    return (x) => g(f(x))
};

export const moviePriceFor: (x: Rental) => number = compose(additionalCostFor,priceFor)
