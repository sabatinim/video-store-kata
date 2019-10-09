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
    m: Movie;

    constructor(rentalDays: number, m: Movie) {
        this.rentalDays = rentalDays;
        this.m = m;
    }

}

export interface Movie {
    price(): number

    minRentDays(): number;

    additionaCostPerDay(): number;
}

export class NewReleaseMovie implements Movie {
    public basePrice = 3.0;

    price(): number {
        return this.basePrice
    }

    minRentDays(): number {
        return 1;
    }

    additionaCostPerDay(): number {
        return 3.0;
    }
}

export class ChildrenMovie implements Movie {
    price(): number {
        return 1.5;
    }

    minRentDays(): number {
        return 3;
    }

    additionaCostPerDay(): number {
        return 1.5;
    }
}