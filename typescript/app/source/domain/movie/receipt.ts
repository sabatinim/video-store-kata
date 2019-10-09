import {Rental} from "./videoStore";
import {moviePriceFor, totalMoviePrice, totalPrice} from "./price";
import {compose} from "../compose";
import {textFooterReceiptFrom, textMovieReceiptFrom, textMoviesReceiptFrom} from "./textReceipt";

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

export const receiptFor = (rentals: Rental[]): string =>

    bodyMoviesReceiptFor(rentals) +
    "\n" +
    textFooterReceiptFrom(totalMoviePrice)(rentals)