import {Rental} from "./movie";

export class PrintableMovie {
    title: string;
    priceRepresentation: string;
    constructor(title: string, priceRepresentation: string) {
        this.title = title;
        this.priceRepresentation = priceRepresentation;

    }
}


export const toPrintableMovie = (
    priceFun:(r:Rental) => number):
    (r:Rental)=> PrintableMovie =>{
    return (r)=> new PrintableMovie(r.m.title(),priceFun(r).toPrecision(2));
};