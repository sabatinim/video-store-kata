import {ChildrenMovie, NewReleaseMovie, Rental} from "../../../source/domain/movie/movie"
import {compose, moviePriceFor} from "../../../source/domain/movie/price";
describe('Video Store', function () {

    it('compose two function', () => {

        let f = (x: string): string => `f(${x})`
        let g = (x: string): string => `g(${x})`

        let gfx: (x: string) => string = compose(f, g)

        expect(gfx("value")).toEqual("g(f(value))")
    });


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
});