import {ChildrenMovie, NewReleaseMovie, Rental} from "../../../source/domain/movie/movie"
import {compose, moviePriceFor} from "../../../source/domain/movie/price";
describe('Video Store', function () {

    it('rent new release movie one day', () => {
        expect(moviePriceFor(new Rental(1, new NewReleaseMovie()))).toEqual(3.0)
    });

    it('rent new release movie two day', () => {
        expect(moviePriceFor(new Rental(2, new NewReleaseMovie()))).toEqual(6.0)
    });

    it('rent children movie one day', () => {
        expect(moviePriceFor(new Rental(1, new ChildrenMovie()))).toEqual(1.5)
    });

    it('rent children movie four day', () => {
        expect(moviePriceFor(new Rental(4, new ChildrenMovie()))).toEqual(3.0)
    });

    class PrintableMovie {
        title: string;
        priceRepresentation: string;
        constructor(title: string, priceRepresentation: string) {
            this.title = title;
            this.priceRepresentation = priceRepresentation;

        }
    }

    const toPrintableMovie = (
        priceFun:(r:Rental) => number):
        (r:Rental)=> PrintableMovie =>{
    return (r)=> new PrintableMovie(r.m.title(),priceFun(r).toPrecision(2));
    };

    const textMovieReceipt = (m:PrintableMovie):string=>{
        return `- ${m.title} ${m.priceRepresentation}`
    }

    it('print one new release movie rent for one day', () => {

        const printableMovieWithPrice = toPrintableMovie(moviePriceFor)
        const movieReceipt = compose(printableMovieWithPrice,textMovieReceipt)
        expect(movieReceipt(new Rental(1, new NewReleaseMovie()))).toEqual("- A_NEW_RELEASE_TITLE 3.0")
    });


});