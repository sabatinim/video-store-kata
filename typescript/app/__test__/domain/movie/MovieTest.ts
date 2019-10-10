import {ChildrenConfiguration, NewReleaseConfiguration, Rental} from "../../../source/domain/movie/videoStore"
import {moviePriceFor} from "../../../source/domain/movie/price";

describe('Movie', function () {

    it('rent new release movie one day', () => {
        expect(moviePriceFor(new Rental(1, new NewReleaseConfiguration("UNUSED")))).toEqual(3.0)
    });

    it('rent new release movie two day', () => {
        expect(moviePriceFor(new Rental(2, new NewReleaseConfiguration("UNUSED")))).toEqual(6.0)
    });

    it('rent children movie one day', () => {
        expect(moviePriceFor(new Rental(1, new ChildrenConfiguration("UNUSED")))).toEqual(1.5)
    });

    it('rent children movie four day', () => {
        expect(moviePriceFor(new Rental(4, new ChildrenConfiguration("UNUSED")))).toEqual(3.0)
    });
});