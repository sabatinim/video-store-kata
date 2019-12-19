import {newReleaseConfiguration, Rental} from "./domain/movie/videoStore";
import {htmlReceiptFor} from "./domain/movie/htmlReceipt";
import {receiptFor} from "./domain/movie/textReceipt";

let aRental = new Rental(1, newReleaseConfiguration("Harry Potter"));
let anotherRental = new Rental(1, newReleaseConfiguration("Mission Impossible"));
let thirdRental = new Rental(4, newReleaseConfiguration("Peppa pig"));
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