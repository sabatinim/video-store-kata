import {Rental} from "./videoStore";
import {moviePriceFor} from "./price";

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
    return (r) => new PrintableMovie(r.mc.title, priceFun(r).toPrecision(2));
};

export const printableMovieFrom: (r: Rental) => PrintableMovie =
    to(moviePriceFor);

export const genericReceiptFor =

    (header: (user: string) => string,
     f: ((rentals: Rental[]) => string)[]):
        (user: string, rentals: Rental[]) => string =>

        (user, rentals) => header(user) +
            f.map(f => f(rentals)).join("\n");