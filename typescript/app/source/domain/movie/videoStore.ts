export class MoviePrices {
    additionalCost: number;
    movieBasePrice: number;

    constructor(additionalCost: number, movieBasePrice: number) {
        this.additionalCost = additionalCost;
        this.movieBasePrice = movieBasePrice;
    }
}
export class Rental {
    rentalDays: number;
    mc: MovieConfiguration;

    constructor(rentalDays: number, m: MovieConfiguration) {
        this.rentalDays = rentalDays;
        this.mc = m;
    }
}
export class MovieConfiguration {
    title: string;
    price: number;
    minRentDays: number;
    additionaCostPerDay: number;
    additionalRenterPoint: number;

    constructor(title: string,
                price: number,
                minRentDays: number,
                additionaCostPerDay: number,
                additionalRenterPoint: number) {
        this.title = title;
        this.price = price;
        this.minRentDays = minRentDays;
        this.additionaCostPerDay = additionaCostPerDay;
        this.additionalRenterPoint = additionalRenterPoint;
    }
}
export const newReleaseConfiguration: (title: string) => MovieConfiguration = (title:string)=>{
    return  new MovieConfiguration(title,3.0,1,3.0,1)
};
export const childrenConfiguration: (title: string) => MovieConfiguration = (title:string)=>{
    return  new MovieConfiguration(title,1.5,3,1.5,0)
};
