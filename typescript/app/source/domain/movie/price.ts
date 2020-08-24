import {MoviePrices, Rental} from "./videoStore";
import {compose} from "../compose";

const additionalCostFor = (rental: Rental): MoviePrices => {
    let additionalCost = 0.0;
    if (rental.rentalDays > rental.mc.minRentDays) {
        const additionalDays = rental.rentalDays - rental.mc.minRentDays
        additionalCost = rental.mc.additionaCostPerDay * additionalDays;
    }
    return new MoviePrices(additionalCost, rental.mc.price);
}

const priceFor = (moviePrices: MoviePrices): number => {
    return moviePrices.movieBasePrice + moviePrices.additionalCost
};

export const totalPrice = (moviePriceFor:(r:Rental) => number):
    (rentals:Rental[])=> number =>{
    return (rentals) => rentals.map(r=>moviePriceFor(r)).reduce((x,y)=>x+y);
}

export const calculateMoviePrice: (x: Rental) => number = compose(additionalCostFor,priceFor)
export const calculateTotalMoviesPrice: (rentals: Rental[]) => number = totalPrice(calculateMoviePrice);