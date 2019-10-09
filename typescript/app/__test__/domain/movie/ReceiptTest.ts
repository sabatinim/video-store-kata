import {NewReleaseConfiguration, Rental} from "../../../source/domain/movie/videoStore"
import {receiptFor} from "../../../source/domain/movie/receipt";

describe('Video Store', function () {

    it('print two new release movie rent for one day', () => {

        const aRental = new Rental(1, new NewReleaseConfiguration("A_NEW_RELEASE_TITLE"));
        const anotherRental = new Rental(1, new NewReleaseConfiguration("ANOTHER_NEW_RELEASE_TITLE"));

        const receipt = receiptFor("Marco",Array.of(aRental, anotherRental));

        expect(receipt).toEqual(
            "Hello Marco this is your receipt\n"+
            "- A_NEW_RELEASE_TITLE 3.0\n" +
            "- ANOTHER_NEW_RELEASE_TITLE 3.0\n" +
            "Total 6.0\n" +
            "Total Rental points 2")
    });
});