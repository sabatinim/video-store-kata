import {
    childrenConfiguration,
    newReleaseConfiguration,
    Rental
} from "../../../source/domain/movie/videoStore"
import {calculateSingleMoviePrice} from "../../../source/domain/movie/price";
import Decimal from 'decimal.js';

describe('Movie', function () {

    it('rent new release movie one day', () => {
        expect(
            calculateSingleMoviePrice(
                new Rental(1,newReleaseConfiguration("UNUSED"))
        )).toEqual(new Decimal(3.0))
    });

    it('rent new release movie two day', () => {
        expect(calculateSingleMoviePrice(new Rental(2, newReleaseConfiguration("UNUSED")))).toEqual(new Decimal(6.0))
    });

    it('rent children movie one day', () => {
        expect(calculateSingleMoviePrice(new Rental(1, childrenConfiguration("UNUSED")))).toEqual(new Decimal(1.5))
    });

    it('rent children movie four day', () => {
        expect(calculateSingleMoviePrice(new Rental(4, childrenConfiguration("UNUSED")))).toEqual(new Decimal(3.0))
    });
});