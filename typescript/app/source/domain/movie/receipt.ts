import {Rental} from "./videoStore";
import {calculateSingleMoviePrice} from "./price";
import Decimal from 'decimal.js';

export class PrintableMovie {
    title: string;
    priceRepresentation: string;

    constructor(title: string, priceRepresentation: string) {
        this.title = title;
        this.priceRepresentation = priceRepresentation;
    }
}

const printableMovieWith =
    (calculateMoviePrice: (r: Rental) => Decimal) =>
        (r: Rental) => new PrintableMovie(r.mc.title, calculateMoviePrice(r).toPrecision(2));

export const printableMovie: (r: Rental) => PrintableMovie =
    printableMovieWith(calculateSingleMoviePrice);
