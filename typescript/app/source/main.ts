import {NewReleaseConfiguration, Rental} from "./domain/movie/videoStore";
import {receiptFor} from "./domain/movie/receipt";

let aRental = new Rental(1, new NewReleaseConfiguration("Harry Potter"));
let anotherRental = new Rental(1, new NewReleaseConfiguration("Mission Impossible"));
let thirdRental = new Rental(4, new NewReleaseConfiguration("Peppa pig"));

console.log(
    receiptFor("Super User",
        Array.of(
            aRental,
            anotherRental,
            thirdRental)));