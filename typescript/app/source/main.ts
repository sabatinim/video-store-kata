import {NewReleaseConfiguration, Rental} from "./domain/movie/videoStore";
import {htmlReceiptFor} from "./domain/movie/htmlReceipt";
import {receiptFor} from "./domain/movie/textReceipt";

let aRental = new Rental(1, new NewReleaseConfiguration("Harry Potter"));
let anotherRental = new Rental(1, new NewReleaseConfiguration("Mission Impossible"));
let thirdRental = new Rental(4, new NewReleaseConfiguration("Peppa pig"));
console.log("------ PLAIN TEXT --------")
console.log(
    receiptFor("Text Receipt User",
        Array.of(
            aRental,
            anotherRental,
            thirdRental)));
console.log("------ HTML --------")
console.log(
    htmlReceiptFor("Html Receipt User",
        Array.of(
            aRental,
            anotherRental,
            thirdRental)));