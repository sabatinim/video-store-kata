import {Receipt} from "./receipt";
import {Rental} from "./videoStore";

export const textMovieReceiptFrom = (m: Receipt): string => {
    return `- ${m.title} ${m.priceRepresentation}`
};

export const textMoviesReceiptFrom = (
    movieReceiptFunc: (x: Rental) => string):
    (rentals: Rental[]) => string => {

    return (rentals) => rentals.map(r => movieReceiptFunc(r)).join("\n")
};