import {MoviePrices, Rental} from "./videoStore";
import {compose} from "../compose";
import Decimal from 'decimal.js';

const calculateAdditionalCost = (rental: Rental): MoviePrices => {
    let additionalCost = new Decimal(0.0);
    if (rental.rentalDays > rental.mc.minRentDays) {
        const additionalDays = rental.rentalDays - rental.mc.minRentDays
        additionalCost = rental.mc.additionaCostPerDay.mul(additionalDays);
    }
    return new MoviePrices(additionalCost, rental.mc.price);
}


const calculatePrice = (moviePrices: MoviePrices): Decimal =>
    moviePrices.movieBasePrice.add(moviePrices.additionalCost)

const calculateTotalPriceWith =
    (calculateMoviePrice: (r: Rental) => Decimal) =>
        (rentals: Rental[]) => rentals.map(calculateMoviePrice).reduce((x, y) => x.add(y))

export const calculateSingleMoviePrice = compose(calculateAdditionalCost, calculatePrice)
export const calculateTotalMoviesPrice: (rentals: Rental[]) => Decimal = calculateTotalPriceWith(calculateSingleMoviePrice)
