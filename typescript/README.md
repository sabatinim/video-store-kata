# Table of Contents
1. [Building blocks and composition](#building-blocks-and-composition)
2. [Building blocks and composition 2nd round](#building-blocks-and-composition-2nd-round)

# Building blocks and composition 
## Overview
How many of us developers have ever tried to put functional programming principles into practice? If you are among them or you are curious and you want to do it, this article can probably be a starting point.

In information technology the best return on investment in training is try to apply principles on a real example. For this reason I decided to use a kata (little coding exercise) to practice. 

I choose the Martin Fowler kata video store. Not the refactoring version but the one from scratch. In this way I had the opportunity to have a blank sheet to start with and think about.

This Kata is very simple but it forces us to think about the domain of the application to be created rather than technical details such as, for example, the use of a DB for persistence or integration with an external service via HTTP or similar protocols. The purpose of the kata is create a system able to rent different types of Movies and print the receipt in different formats. 

### Test first
The first thing I did was to deal with the problem of renting a video by writing a series of tests relating to the calculation of the price of the single type of movie, such as:

``` typescript
it('rent new Release Movie for one day', () => {
        expect(moviePriceFor(new Rental(1, newReleaseConfiguration("UNUSED")))).toEqual(3.0)
});
it('rent Children Movie for four day', () => {
        expect(moviePriceFor(new Rental(4, childrenConfiguration("UNUSED")))).toEqual(3.0)
});
```

Writing these tests emerged the concepts of **Rent**, **type of Movie**, **additional price calculation for each extra day** and **single movie price calculation**. 

So in my production code I have these two function: 

``` typescript
const additionalCostFor = (rental: Rental): MoviePrices => {
  let additionalCost = 0.0;
  if (rental.rentalDays > rental.mc.minRentDays) {
    const additionalDays = rental.rentalDays - rental.mc.minRentDays
    additionalCost = rental.mc.additionaCostPerDay * additionalDays;
  }
  return new MoviePrices(additionalCost, rental.mc.price);
}

const priceFor = (moviePrices: MoviePrices): number => {
    return (moviePrices.movieBasePrice + moviePrices.additionalCost).toPrecision(5) 
};
```

The first function calculates the additional price and the second add the price and scale to five decimal places.

We can notice that I have the **'building block'** I can compose 
to have a function that calculate the fully price for a single movie type. Let's go and apply composition! 

### Composition
At this point I decided to implement the compose function writing a test before production code:

``` typescript
it('compose two function', () => {

  let f = (x: string): string => `f(${x})`
  let g = (x: string): string => `g(${x})`

  let gfx: (x: string) => string = compose(f, g)

  expect(gfx("value")).toEqual("g(f(value))")
});
```
Inside the test I define two functions 'f' and 'g' and I compose them obtaining a concatenation of strings.

The production code is the following:

``` typescript
export const compose = <A,B,C>(
  f: (x: A) => B,
  g: (y: B) => C):
  (x: A) => C => {
    
    return (x) => g(f(x))
};
```

The compose function does nothing but compose two functions by generalizing the types of inputs and outputs.
In this way I can use it indiscriminately for each pair of functions whose output type of one is the input for the other.

Returning to our case of calculating the pricing of a movie, I can compose the functions as follows:

``` typescript
const moviePriceFor: (x: Rental) => number = compose(additionalCostFor,priceFor)
```

In this way the type system is telling me I have a function that takes a Rental and gives back a number that represent price per movie (Maybe I should also have typed the outgoing concept and not leave the primitive obsession :) ).

We can notice that I didn't even have to write a test before bringing out this design because it came out independently and it is the compiler that tells me that the two functions compose. 
Try to compose again!  

## Curry
By creating basic functions (building blocks) it is possible to compose them by creating more complex functions in an automatic and natural way, this pushes to have a code in which the responsibilities are very clear and isolated and makes for an excellent degree of cohesion and coupling.
In fact, for the total price calculation I just had to reuse the calculation of the single Movie after having inject it by the curry and apply it with map reduce.

``` typescript
export const totalPrice = (moviePriceFor:(r:Rental) => number):(rentals:Rental[])=> number =>{
  return (rentals) => rentals.map(r=>moviePriceFor(r)).reduce((x,y)=>x+y);
}
```
Curry only partially applies the function and return a configured function. 

## Software Modularization
The price calculation functions for single Movie and calculation of the total are exported from the pricing module because they are used by the module responsible to print the receipt in html and by the module respondible to print the receipt in plain text.

This means that I have defined the public interface between the modules, which among other things can help to test the various modules individually.

## Considerations
The building blocks are the leaves of our software that can be composed to have more complex functions. 
With functional programming, You are dealing with Functions as the basic building block. Each function can be thought of as a lego Bricks

A pure function is by definition isolated. Unlike Encapsulation where an Object is trying to hide things from you, a pure function can not do anything It did not declare in its interface (or signature). You could say that a Pure function is "honest".

This causes a paradigm shift because You need to think of solving problems by breaking them down into these small isolated functions and then re-assembling them at your application entry point.
This might seem counter-intuitive at first but then when you open you mind to the possibilities, It fundamentally changes how you think about building software.

## Next
Monads :) 

## References
[Github code](https://www.github.com/sabatinim/video-store-kata/tree/master/typescript) 
[Scott Wlashin the power of composition](https://www.slideshare.net/mobile/ScottWlaschin/the-power-of-composition) 

# Building blocks and composition 2nd round
Hi guys, again here. 
I want to add some hints regarding software modularisation. The example is always our video store kata. 
I'd like to share with you how in functional style manage the OCP principle. 
This principle said: **software should be open for extension, but closed for modification.**
This is very simple to understand but very hard to achieve and for me it's the base for the team agility (resiliency to changes).
Coming back to our example we have to print the receipt in plaint text but we also have the secret requirement to print it also in HTML. In order to do this change, we don't want to change our code but we want to extend it in perfect OCP style :)
I'm going to show you the receipt module:

``` typescript
class PrintableMovie {
    title: string;
    priceRepresentation: string;

    constructor(title: string, priceRepresentation: string) {
        this.title = title;
        this.priceRepresentation = priceRepresentation;
    }
}

const printableMovieWith =
    (calculateMoviePrice: (r: Rental) => number) =>
        (r: Rental) => new PrintableMovie(r.mc.title, calculateMoviePrice(r).toPrecision(2));

export const printableMovie: (r: Rental) => PrintableMovie =
    printableMovieWith(calculateMoviePrice);
```
This module is quite generic. 
I implemented a **PrintableMovie** data type in order to represent something that should be printed. 
I also implemented two function, the **printableMovieWith** is a function that wants the price calculation function as currying and **printableMovie** that is responsible to transform a Rental into a PrintableMovie. 
This is the contact point between pricing module and receipt module.

Is very useful to have this decoupling because we could test pricing and receipt like they're two black box (for example inject a price function as stub and testing only the templating).

At this point we have to generalise the print receipt function like:

``` typescript
export const genericReceipt =
    (header: (user: string) => string,
     body: (rentals: Rental[]) => string,
     footer: (rentals: Rental[]) => string,
     rentalPoint: (rentals: Rental[]) => string) =>

        (user:string, rentals:Rental[]) =>
            header(user) +
            body(rentals) + "\n" +
            footer(rentals) + "\n" +
            rentalPoint(rentals)
```
Ok we can notice some duplication like **(rentals: Rental[]) => string** but we could accept it now :)

Now we're able to implement the plain text template and the html one. Let's go and show me the code. 

For plain text we have: 

``` typescript
const textMovieReceipt = (m: PrintableMovie): string =>
     `- ${m.title} ${m.priceRepresentation}`

const textMoviesReceiptWith = (
    movieReceiptFunc: (x: Rental) => string) =>
     (rentals: Rental[]) => rentals.map(r => movieReceiptFunc(r)).join("\n")

const textFooterReceiptWith = (
    totalPrice: (rentals: Rental[]) => number) =>
     (rentals: Rental[]) => `Total ${totalPrice(rentals).toPrecision(2)}`

const textFooterRentalPointReceiptWith = (
    calculateRentalPoint: (rentals: Rental[]) => number) =>
     (rentals: Rental[]) => `Total Rental points ${calculateRentalPoint(rentals)}`

//WIRING HERE
const textFooterRentalPointReceipt =
    textFooterRentalPointReceiptWith(calculateRentalPoints);

const textFooterReceipt: (rentals: Rental[]) => string =
    textFooterReceiptWith(calculateTotalMoviesPrice);

const textMoviesReceipt: (rentals: Rental[]) => string =
    textMoviesReceiptWith(compose(
        printableMovie,
        textMovieReceipt))

const textHeader = (user: string) => `Hello ${user} this is your receipt\n`;

//WIRING THE PRINT FUNCTION WITH PLAIN TEXT BEHAVIOUR
export const printTextReceipt: (user: string, rentals: Rental[]) => string =
    genericReceipt(
        textHeader,
        textMoviesReceipt,
        textFooterReceipt,
        textFooterRentalPointReceipt)
```
Instead for HTML we have:

``` typescript
const htmlMovieReceipt = (m: PrintableMovie): string =>
    `<li>${m.title} ${m.priceRepresentation}</li>`

const htmlMoviesReceiptWith = (
    htmlMovieReceipt: (x: Rental) => string) =>
    (rentals: Rental[]) => `<ul>\n${rentals.map(r => htmlMovieReceipt(r)).join("\n")}\n</ul>`

const htmlFooterReceiptWith = (
    calculateMoviesTotalPrice: (rentals: Rental[]) => number) =>
    (rentals: Rental[]) => `<br>You owed ${calculateMoviesTotalPrice(rentals).toPrecision(2)}`

const htmlFooterRentalPointReceiptWith = (
    calculateRentalPoint: (rentals: Rental[]) => number) =>
    (rentals: Rental[]) => `<br>You earned ${calculateRentalPoint(rentals)} frequent renter points\n</body>\n</html>`

//WIRING HERE
const htmlFooterRentalPointReceipt: (rentals: Rental[]) => string =
    htmlFooterRentalPointReceiptWith(calculateRentalPoints);

const htmlFooterReceipt: (rentals: Rental[]) => string =
    htmlFooterReceiptWith(calculateTotalMoviesPrice);

const htmlMoviesReceipt: (rentals: Rental[]) => string =
    htmlMoviesReceiptWith(compose(
        printableMovie,
        htmlMovieReceipt))

const htmlHeader = (user: string) =>
    `<!DOCTYPE html>\n` +
    `<html>\n` +
    `<head>\n` +
    `<title>Video store - statement for ${user}</title>\n` +
    `</head>\n` +
    `<body>\n` +
    `<h1>Rental Record for ${user}</h1>\n`

//WIRING THE PRINT FUNCTION WITH HTML TEXT BEHAVIOUR
export const printHtmlReceipt: (user: string, rentals: Rental[]) => string =
    genericReceipt(
        htmlHeader,
        htmlMoviesReceipt,
        htmlFooterReceipt,
        htmlFooterRentalPointReceipt)
```

Ok the code is more or less the same. The only things I had to do were implement the different templating functions and wire them using the **genericReceipt** function. 
This means that my code is OPEN for extension and CLOSE for modification.

This brings a lots of benefits because is very easy inject new behaviours (different templating format). 

The fundamental thing to understand is this: we have to make sure that our design is **emerging.**
My first version was very different from the actual design. I had to refactor my code before I had to implement the new feature (HTML receipt). 
This is why **continuous refactoring** practice is very important for our architecture.

## References
[Github code](https://www.github.com/sabatinim/video-store-kata/tree/master/typescript) 
[Scott Wlashin the power of composition](https://www.slideshare.net/mobile/ScottWlaschin/the-power-of-composition) 
