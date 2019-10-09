import {ChildrenMovie, NewReleaseMovie, Rental} from "../../../source/domain/movie/movie"
import {moviePriceFor} from "../../../source/domain/movie/price";
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
});