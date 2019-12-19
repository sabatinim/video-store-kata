import {
    childrenConfiguration,
    newReleaseConfiguration,
    Rental
} from "../../../source/domain/movie/videoStore"
import {calculateRentalPoints} from "../../../source/domain/movie/rentPoint";

describe('Renter Points', function () {

    it('two new release movie one day', () => {
        let aRental = new Rental(1, newReleaseConfiguration("::title::"));
        let anotherRental = new Rental(1, newReleaseConfiguration("::anothertitle::"));
        expect(calculateRentalPoints(Array.of(aRental,anotherRental))).toEqual(2)
    });

    it('two new release movie one day', () => {
        let one = new Rental(1, newReleaseConfiguration("::title::"));
        let two = new Rental(7, newReleaseConfiguration("::anothertitle::"));
        let three = new Rental(4, childrenConfiguration("::children title::"));

        expect(calculateRentalPoints(Array.of(one,two,three))).toEqual(4)
    });
});