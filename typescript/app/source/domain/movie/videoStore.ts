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
    mc: MovieConfigurationContainer;

    constructor(rentalDays: number, m: MovieConfigurationContainer) {
        this.rentalDays = rentalDays;
        this.mc = m;
    }
}
export class MovieConfigurationContainer {
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
export const newReleaseConfiguration = (title:string)=>{
    return  new MovieConfigurationContainer(title,3.0,1,3.0,1)
};
export const childrenConfiguration = (title:string)=>{
    return  new MovieConfigurationContainer(title,1.5,3,1.5,0)
};
