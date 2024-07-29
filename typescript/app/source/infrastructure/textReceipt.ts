import {printableMovie, PrintableMovie} from "../domain/movie/receipt";
import {Rental} from "../domain/movie/videoStore";
import {calculateRentalPoints} from "../domain/movie/rentPoint";
import {calculateTotalMoviesPrice} from "../domain/movie/price";
import {compose} from "../domain/compose";
import Decimal from 'decimal.js';

const textMovieReceipt = (m: PrintableMovie): string =>
    `- ${m.title} ${m.priceRepresentation}`

const textMoviesReceiptWith = (
    movieReceiptFunc: (x: Rental) => string) =>
    (rentals: Rental[]) => rentals.map(r => movieReceiptFunc(r)).join("\n")

const textFooterReceiptWith = (
    totalPrice: (rentals: Rental[]) => Decimal) =>
    (rentals: Rental[]) => `Total ${totalPrice(rentals).toPrecision(2)}`

const textFooterRentalPointReceiptWith = (
    calculateRentalPoint: (rentals: Rental[]) => number) =>
    (rentals: Rental[]) => `Total Rental points ${calculateRentalPoint(rentals)}`

//WIRING HERE
const textFooterRentalPointReceipt =
    textFooterRentalPointReceiptWith(calculateRentalPoints);

const textFooterReceipt: (rentals: Rental[]) => string =
    textFooterReceiptWith(calculateTotalMoviesPrice);

const textMoviesReceipt: (rentals: Rental[]) => string =
    textMoviesReceiptWith(compose(
        printableMovie,
        textMovieReceipt))

const textHeader = (user: string) => `Hello ${user} this is your receipt\n`;

//WIRING THE PRINT FUNCTION WITH PLAIN TEXT BEHAVIOUR
export const printTextReceipt = (user: string, rentals: Rental[]): string => {
    return `Hello ${user} this is your receipt\n` +
            textMoviesReceipt(rentals) + '\n' +
            textFooterReceipt(rentals) + '\n' +
            textFooterRentalPointReceipt(rentals)
}
