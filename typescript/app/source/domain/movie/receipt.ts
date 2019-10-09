import {Rental} from "./videoStore";
import {moviePriceFor} from "./price";
import {compose} from "../compose";
import {textMovieReceiptFrom, textMoviesReceiptFrom} from "./textReceipt";

export class Receipt {
    title: string;
    priceRepresentation: string;
    constructor(title: string, priceRepresentation: string) {
        this.title = title;
        this.priceRepresentation = priceRepresentation;

    }
}

const to = (
    priceFun:(r:Rental) => number):
    (r:Rental)=> Receipt =>{
    return (r)=> new Receipt(r.m.title(),priceFun(r).toPrecision(2));
};

const printableMovieFrom: (r: Rental) => Receipt =
    to(moviePriceFor);

const movieReceiptFrom: (x: Rental) => string =
    compose(
        printableMovieFrom,
        textMovieReceiptFrom);

export const bodyMoviesReceiptFor: (rentals: Rental[]) => string =
    textMoviesReceiptFrom(movieReceiptFrom)
