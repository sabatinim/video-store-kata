import {genericReceiptFor, PrintableMovie, printableMovieFrom} from "./receipt";
import {Rental} from "./videoStore";
import {compose} from "../compose";
import {calculateRentalPoints} from "./rentPoint";
import {moviesPriceFor} from "./price";

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
export const textFooterRentalPointReceiptFrom = (
    calculateRentalPoint: (rentals: Rental[]) => number):
    (rentals: Rental[]) => string => {
    return (rentals) => `Total Rental points ${calculateRentalPoint(rentals)}`
};

const movieReceiptFrom: (x: Rental) => string =
    compose(
        printableMovieFrom,
        textMovieReceiptFrom);

const footerRentalPointReceiptFrom =
    textFooterRentalPointReceiptFrom(calculateRentalPoints);

const footerReceiptFrom: (rentals: Rental[]) => string =
    textFooterReceiptFrom(moviesPriceFor);

export const moviesReceiptFor: (rentals: Rental[]) => string =
    textMoviesReceiptFrom(movieReceiptFrom)

const textHeader = (user: string) => `Hello ${user} this is your receipt\n`;
export const receiptFor: (user: string, rentals: Rental[]) => string = genericReceiptFor(textHeader, Array.of(moviesReceiptFor, footerReceiptFrom, footerRentalPointReceiptFrom))
