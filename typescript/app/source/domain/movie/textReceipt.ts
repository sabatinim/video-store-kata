import {genericReceipt, PrintableMovie, printableMovie} from "./receipt";
import {Rental} from "./videoStore";
import {compose} from "../compose";
import {calculateRentalPoints} from "./rentPoint";
import {calculateTotalMoviesPrice} from "./price";

const textMovieReceipt = (m: PrintableMovie): string =>
     `- ${m.title} ${m.priceRepresentation}`

const textMoviesReceiptWith = (
    movieReceiptFunc: (x: Rental) => string) =>
     (rentals: Rental[]) => rentals.map(r => movieReceiptFunc(r)).join("\n")

const textFooterReceiptWith = (
    totalPrice: (rentals: Rental[]) => number) =>
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
export const printTextReceipt: (user: string, rentals: Rental[]) => string =
    genericReceipt(
        textHeader,
        textMoviesReceipt,
        textFooterReceipt,
        textFooterRentalPointReceipt)