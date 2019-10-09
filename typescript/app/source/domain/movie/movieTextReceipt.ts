import {PrintableMovie, toPrintableMovie} from "./printableMovie";
import {compose, moviePriceFor} from "./price";

const textMovieReceipt = (m:PrintableMovie):string=>{
    return `- ${m.title} ${m.priceRepresentation}`
}

const printableMovieWithPrice = toPrintableMovie(moviePriceFor);

export const movieReceipt = compose(printableMovieWithPrice,textMovieReceipt);