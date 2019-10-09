

describe('It works', function () {

    class MoviePrices {
        additionalCost: number;
        movieBasePrice: number;
        constructor(additionalCost: number, movieBasePrice: number) {
            this.additionalCost = additionalCost;
            this.movieBasePrice = movieBasePrice;
        }
    }

    class Rental {
        rentalDays: number;
        m: Movie;
        constructor(rentalDays: number, m: Movie) {
            this.rentalDays = rentalDays;
            this.m = m;
        }

    }

    interface Movie{
        price():number

        minRentDays(): number;

        additionaCostPerDay(): number;
    }
    class NewReleaseMovie implements Movie{
        public basePrice = 3.0;

        price():number {
            return this.basePrice
        }

        minRentDays(): number {
            return 1;
        }

        additionaCostPerDay(): number {
            return 3.0;
        }
    }
    class ChildrenMovie implements Movie {
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

    let additionalCostFor = (rental: Rental):MoviePrices => {
        let additionalCost = 0.0;
        if (rental.rentalDays > rental.m.minRentDays()) {
            const additionalDays = rental.rentalDays - rental.m.minRentDays()
            additionalCost = rental.m.additionaCostPerDay() * additionalDays;
        }
        return new MoviePrices(additionalCost,rental.m.price());
    }

    let priceFor = (moviePrices: MoviePrices): number => {
        return moviePrices.movieBasePrice + moviePrices.additionalCost
    };

    it('rent new release movie one day', () => {

        expect(priceFor(additionalCostFor(new Rental(1,new NewReleaseMovie())))).toEqual( 3.0)

    });

    it('rent new release movie two day', () => {
        expect(priceFor(additionalCostFor(new Rental(2,new NewReleaseMovie())))).toEqual( 6.0)
    });

    it('rent children movie one day', () => {
        expect(priceFor(additionalCostFor(new Rental(1, new ChildrenMovie())))).toEqual( 1.5)
    });

    it('rent children movie four day', () => {
        expect(priceFor( additionalCostFor(new Rental(4,new ChildrenMovie())))).toEqual( 3.0)
    });



});