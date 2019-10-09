import {Rental} from "./videoStore";
import {moviePriceFor, moviesPriceFor, totalPrice} from "./price";
import {compose} from "../compose";
import {
    textFooterReceiptFrom,
    textFooterRentalPointReceiptFrom,
    textMovieReceiptFrom,
    textMoviesReceiptFrom
} from "./textReceipt";
import {calculateRentalPoints} from "./rentPoint";

export class PrintableMovie {
    title: string;
    priceRepresentation: string;

    constructor(title: string, priceRepresentation: string) {
        this.title = title;
        this.priceRepresentation = priceRepresentation;
    }
}

const to = (
    priceFun: (r: Rental) => number):
    (r: Rental) => PrintableMovie => {
    return (r) => new PrintableMovie(r.m.title(), priceFun(r).toPrecision(2));
};

const printableMovieFrom: (r: Rental) => PrintableMovie =
    to(moviePriceFor);

const movieReceiptFrom: (x: Rental) => string =
    compose(
        printableMovieFrom,
        textMovieReceiptFrom);

export const bodyMoviesReceiptFor: (rentals: Rental[]) => string =
    textMoviesReceiptFrom(movieReceiptFrom)

export const receiptFor = (user:string,rentals: Rental[]): string =>

    `Hello ${user} this is your receipt\n`+
    bodyMoviesReceiptFor(rentals) +
    "\n" +
    textFooterReceiptFrom(moviesPriceFor)(rentals)+
    "\n"+
    textFooterRentalPointReceiptFrom(calculateRentalPoints)(rentals)