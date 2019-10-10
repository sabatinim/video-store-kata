import {ChildrenConfiguration, NewReleaseConfiguration, Rental} from "../../../source/domain/movie/videoStore"
import {receiptFor} from "../../../source/domain/movie/textReceipt";

describe('Video Store', function () {

    it('print two new release movie rent for one day', () => {

        const aRental = new Rental(1, new NewReleaseConfiguration("A_NEW_RELEASE_TITLE"));
        const anotherRental = new Rental(1, new NewReleaseConfiguration("ANOTHER_NEW_RELEASE_TITLE"));
        const aThirdRental = new Rental(1, new ChildrenConfiguration("A_CHILDREN_RELEASE_TITLE"));

        const receipt = receiptFor("Marco",Array.of(aRental, anotherRental,aThirdRental));

        expect(receipt).toEqual(
            "Hello Marco this is your receipt\n"+
            "- A_NEW_RELEASE_TITLE 3.0\n" +
            "- ANOTHER_NEW_RELEASE_TITLE 3.0\n" +
            "- A_CHILDREN_RELEASE_TITLE 1.5\n" +
            "Total 7.5\n" +
            "Total Rental points 3")
    });


});