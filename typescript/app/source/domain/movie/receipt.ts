import {Rental} from "./videoStore";
import {calculateMoviePrice} from "./price";

export class PrintableMovie {
    title: string;
    priceRepresentation: string;

    constructor(title: string, priceRepresentation: string) {
        this.title = title;
        this.priceRepresentation = priceRepresentation;
    }
}

const printableMovieWith =
    (calculateMoviePrice: (r: Rental) => number) =>
        (r: Rental) => new PrintableMovie(r.mc.title, calculateMoviePrice(r).toPrecision(2));

export const printableMovie: (r: Rental) => PrintableMovie =
    printableMovieWith(calculateMoviePrice);


export const genericReceipt =
    (header: (user: string) => string,
     body: (rentals: Rental[]) => string,
     footer: (rentals: Rental[]) => string,
     rentalPoint: (rentals: Rental[]) => string) =>

        (user:string, rentals:Rental[]) =>
            header(user) +
            body(rentals) + "\n" +
            footer(rentals) + "\n" +
            rentalPoint(rentals)