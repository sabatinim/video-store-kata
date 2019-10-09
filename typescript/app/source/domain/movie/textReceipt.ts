import {PrintableMovie} from "./receipt";
import {Rental} from "./videoStore";

export const textMovieReceiptFrom = (m: PrintableMovie): string => {
    return `- ${m.title} ${m.priceRepresentation}`
};

export const textMoviesReceiptFrom = (
    movieReceiptFunc: (x: Rental) => string):
    (rentals: Rental[]) => string => {

    return (rentals) => rentals.map(r => movieReceiptFunc(r)).join("\n")
};

export const textFooterReceiptFrom = (
    totalPrice: (rentals: Rental[]) => number):
    (rentals: Rental[]) => string => {

    return (rentals) => `Total ${totalPrice(rentals).toPrecision(2)}`
};