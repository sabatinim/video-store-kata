import {MoviePrices, Rental} from "./videoStore";
import {compose} from "../compose";

const calculateAdditionalCost = (rental: Rental): MoviePrices => {
    let additionalCost = 0.0;
    if (rental.rentalDays > rental.mc.minRentDays) {
        const additionalDays = rental.rentalDays - rental.mc.minRentDays
        additionalCost = rental.mc.additionaCostPerDay * additionalDays;
    }
    return new MoviePrices(additionalCost, rental.mc.price);
}

const calculatePrice = (moviePrices: MoviePrices): number =>
     moviePrices.movieBasePrice + moviePrices.additionalCost

export const calculateTotalPriceWith =
    (calculateMoviePrice:(r:Rental) => number) =>
     (rentals:Rental[]) => rentals.map(calculateMoviePrice).reduce((x,y)=>x+y)

export const calculateSingleMoviePrice: (x: Rental) => number = compose(calculateAdditionalCost,calculatePrice)
export const calculateTotalMoviesPrice: (rentals: Rental[]) => number = calculateTotalPriceWith(calculateSingleMoviePrice)