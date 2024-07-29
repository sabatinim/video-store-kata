import Decimal from 'decimal.js';

export class MoviePrices {
    additionalCost: Decimal;
    movieBasePrice: Decimal;

    constructor(additionalCost: Decimal, movieBasePrice: Decimal) {
        this.additionalCost = additionalCost;
        this.movieBasePrice = movieBasePrice;
    }
}

export type Rental = {
    rentalDays: number;
    mc: MovieConfiguration;
}


type MovieConfiguration = {
    title: string;
    price: Decimal;
    minRentDays: number;
    additionalCostPerDay: Decimal;
    additionalRenterPoint: number;
}

export const newReleaseConfiguration = (title: string): MovieConfiguration => {
    return {
        title: title,
        price: new Decimal(3.0),
        minRentDays: 1,
        additionalCostPerDay: new Decimal(3.0),
        additionalRenterPoint: 1
    }
};
export const childrenConfiguration = (title: string): MovieConfiguration => {
    return {
        title: title,
        price: new Decimal(1.5),
        minRentDays: 3,
        additionalCostPerDay: new Decimal(1.5),
        additionalRenterPoint: 0
    }
};
