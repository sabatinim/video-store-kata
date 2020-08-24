import {genericReceipt, PrintableMovie, printableMovie} from "./receipt";
import {Rental} from "./videoStore";
import {compose} from "../compose";
import {calculateRentalPoints} from "./rentPoint";
import {calculateTotalMoviesPrice} from "./price";

const htmlMovieReceipt = (m: PrintableMovie): string =>
    `<li>${m.title} ${m.priceRepresentation}</li>`

const htmlMoviesReceiptWith = (
    htmlMovieReceipt: (x: Rental) => string) =>
    (rentals: Rental[]) => `<ul>\n${rentals.map(r => htmlMovieReceipt(r)).join("\n")}\n</ul>`

const htmlFooterReceiptWith = (
    calculateMoviesTotalPrice: (rentals: Rental[]) => number) =>
    (rentals: Rental[]) => `<br>You owed ${calculateMoviesTotalPrice(rentals).toPrecision(2)}`

const htmlFooterRentalPointReceiptWith = (
    calculateRentalPoint: (rentals: Rental[]) => number) =>
    (rentals: Rental[]) => `<br>You earned ${calculateRentalPoint(rentals)} frequent renter points\n</body>\n</html>`

//WIRING HERE
const htmlFooterRentalPointReceipt: (rentals: Rental[]) => string =
    htmlFooterRentalPointReceiptWith(calculateRentalPoints);

const htmlFooterReceipt: (rentals: Rental[]) => string =
    htmlFooterReceiptWith(calculateTotalMoviesPrice);

const htmlMoviesReceipt: (rentals: Rental[]) => string =
    htmlMoviesReceiptWith(compose(
        printableMovie,
        htmlMovieReceipt))

const htmlHeader = (user: string) =>
    `<!DOCTYPE html>\n` +
    `<html>\n` +
    `<head>\n` +
    `<title>Video store - statement for ${user}</title>\n` +
    `</head>\n` +
    `<body>\n` +
    `<h1>Rental Record for ${user}</h1>\n`

//WIRING THE PRINT FUNCTION WITH HTML TEXT BEHAVIOUR
export const printHtmlReceipt: (user: string, rentals: Rental[]) => string =
    genericReceipt(
        htmlHeader,
        htmlMoviesReceipt,
        htmlFooterReceipt,
        htmlFooterRentalPointReceipt)