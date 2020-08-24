import {
    childrenConfiguration,
    newReleaseConfiguration,
    Rental
} from "../../../source/domain/movie/videoStore"
import {printTextReceipt} from "../../../source/domain/movie/textReceipt";
import {printHtmlReceipt} from "../../../source/domain/movie/htmlReceipt";

describe('Video Store', function () {

    it('print plain text receipt', () => {

        const aRental = new Rental(1, newReleaseConfiguration("A_NEW_RELEASE_TITLE"));
        const anotherRental = new Rental(1, newReleaseConfiguration("ANOTHER_NEW_RELEASE_TITLE"));
        const aThirdRental = new Rental(1, childrenConfiguration("A_CHILDREN_RELEASE_TITLE"));

        const receipt = printTextReceipt("Marco",Array.of(aRental, anotherRental,aThirdRental));

        expect(receipt).toEqual(
            "Hello Marco this is your receipt\n"+
            "- A_NEW_RELEASE_TITLE 3.0\n" +
            "- ANOTHER_NEW_RELEASE_TITLE 3.0\n" +
            "- A_CHILDREN_RELEASE_TITLE 1.5\n" +
            "Total 7.5\n" +
            "Total Rental points 3")
    });


    it('print html receipt', () => {

        const aRental = new Rental(1, newReleaseConfiguration("A_NEW_RELEASE_TITLE"));
        const anotherRental = new Rental(1, newReleaseConfiguration("ANOTHER_NEW_RELEASE_TITLE"));
        const aThirdRental = new Rental(1, childrenConfiguration("A_CHILDREN_RELEASE_TITLE"));

        const receipt = printHtmlReceipt("Marco",Array.of(aRental, anotherRental,aThirdRental));

        expect(receipt).toEqual(
            "<!DOCTYPE html>\n" +
            "<html>\n" +
            "<head>\n" +
            "<title>Video store - statement for Marco</title>\n" +
            "</head>\n" +
            "<body>\n" +
            "<h1>Rental Record for Marco</h1>\n" +
            "<ul>\n" +
            "<li>A_NEW_RELEASE_TITLE 3.0</li>\n" +
            "<li>ANOTHER_NEW_RELEASE_TITLE 3.0</li>\n" +
            "<li>A_CHILDREN_RELEASE_TITLE 1.5</li>\n" +
            "</ul>\n" +
            "<br>You owed 7.5\n" +
            "<br>You earned 3 frequent renter points\n" +
            "</body>\n" +
            "</html>")
    });
});