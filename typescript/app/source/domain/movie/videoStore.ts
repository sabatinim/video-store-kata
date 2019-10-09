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
    m: MovieConfiguration;

    constructor(rentalDays: number, m: MovieConfiguration) {
        this.rentalDays = rentalDays;
        this.m = m;
    }
}

interface MovieConfiguration {
    price(): number
    minRentDays(): number;
    additionaCostPerDay(): number;
    title(): string;
}

export class NewReleaseConfiguration implements MovieConfiguration {
    private _title: string;
    constructor(title: string) {
        this._title = title;
    }

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

    title(): string {
        return this._title;
    }
}

export class ChildrenConfiguration implements MovieConfiguration {
    price(): number {
        return 1.5;
    }

    minRentDays(): number {
        return 3;
    }

    additionaCostPerDay(): number {
        return 1.5;
    }

    title(): string {
        return "";
    }
}