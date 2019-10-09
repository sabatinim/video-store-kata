import {PrintableMovie, toPrintableMovie} from "./printableMovie";
import {compose, moviePriceFor} from "./price";
import {Rental} from "./movie";

const textMovieReceipt = (m: PrintableMovie): string => {
    return `- ${m.title} ${m.priceRepresentation}`
};

const printableMovieWithPrice: (r: Rental) => PrintableMovie = toPrintableMovie(moviePriceFor);

export const movieReceipt: (x: Rental) => string = compose(printableMovieWithPrice, textMovieReceipt);

const moviesReceipt = (
    movieReceiptFunc: (x: Rental) => string):
    (rentals: Rental[]) => string => {

    return (rentals) => rentals.map(r => movieReceiptFunc(r)).join("\n")
};

export const textBodyMoviesReceiptFor: (rentals: Rental[]) => string = moviesReceipt(movieReceipt)
