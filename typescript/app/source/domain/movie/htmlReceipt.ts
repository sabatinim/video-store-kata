import {genericReceiptFor, PrintableMovie, printableMovieFrom} from "./receipt";
import {Rental} from "./videoStore";
import {compose} from "../compose";
import {calculateRentalPoints} from "./rentPoint";
import {moviesPriceFor} from "./price";

export const htmlMovieReceiptFrom = (m: PrintableMovie): string => {
    return `<li>${m.title} ${m.priceRepresentation}</li>`
};

export const htmlMoviesReceiptFrom = (
    movieReceiptFunc: (x: Rental) => string):
    (rentals: Rental[]) => string => {

    return (rentals) => `<ul>\n${rentals.map(r => movieReceiptFunc(r)).join("\n")}\n</ul>`
};

export const htmlFooterReceiptFrom = (
    totalPrice: (rentals: Rental[]) => number):
    (rentals: Rental[]) => string => {

    return (rentals) => `<br>You owed ${totalPrice(rentals).toPrecision(2)}`
};
export const htmlFooterRentalPointReceiptFrom = (
    calculateRentalPoint: (rentals: Rental[]) => number):
    (rentals: Rental[]) => string => {
    return (rentals) => `<br>You earned ${calculateRentalPoint(rentals)} frequent renter points\n</body>\n</html>`
};

const movieReceiptFrom: (x: Rental) => string =
    compose(
        printableMovieFrom,
        htmlMovieReceiptFrom);

const footerRentalPointReceiptFrom =
    htmlFooterRentalPointReceiptFrom(calculateRentalPoints);

const footerReceiptFrom: (rentals: Rental[]) => string =
    htmlFooterReceiptFrom(moviesPriceFor);

export const moviesReceiptFor: (rentals: Rental[]) => string =
    htmlMoviesReceiptFrom(movieReceiptFrom)

const htmlHeader = (user: string) =>
    `<!DOCTYPE html>\n`+
    `<html>\n` +
    `<head>\n` +
    `<title>Video store - statement for ${user}</title>\n` +
    `</head>\n` +
    `<body>\n` +
    `<h1>Rental Record for ${user}</h1>\n`

export const htmlReceiptFor: (user: string, rentals: Rental[]) => string = genericReceiptFor(htmlHeader, Array.of(moviesReceiptFor, footerReceiptFrom, footerRentalPointReceiptFrom))
