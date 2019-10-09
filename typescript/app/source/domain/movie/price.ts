import {MoviePrices, Rental} from "./videoStore";
import {compose} from "../compose";
import {PrintableMovie} from "./receipt";

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

export const totalPrice = (moviePriceFor:(r:Rental) => number):
    (rentals:Rental[])=> number =>{
    return (rentals) => rentals.map(r=>moviePriceFor(r)).reduce((x,y)=>x+y);
}


export const moviePriceFor: (x: Rental) => number = compose(additionalCostFor,priceFor)
export const totalMoviePrice = totalPrice(moviePriceFor);