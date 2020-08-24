import {newReleaseConfiguration, Rental} from "./domain/movie/videoStore";
import {printHtmlReceipt} from "./domain/movie/htmlReceipt";
import {printTextReceipt} from "./domain/movie/textReceipt";

let aRental = new Rental(1, newReleaseConfiguration("Harry Potter"));
let anotherRental = new Rental(1, newReleaseConfiguration("Mission Impossible"));
let thirdRental = new Rental(4, newReleaseConfiguration("Peppa pig"));
console.log("------ PLAIN TEXT --------")
console.log(
    printTextReceipt("Text Receipt User",
        Array.of(
            aRental,
            anotherRental,
            thirdRental)));
console.log("------ HTML --------")
console.log(
    printHtmlReceipt("Html Receipt User",
        Array.of(
            aRental,
            anotherRental,
            thirdRental)));