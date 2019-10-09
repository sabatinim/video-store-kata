

describe('It works', function () {

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

    function additionalCostFor(days: number,minRentDay: number, additionalCostPerDay: any) {
        let additionalCost = 0.0;
        if (days > minRentDay) {
            const additionalDays = days - minRentDay
            additionalCost = additionalCostPerDay * additionalDays;
        }
        return additionalCost;
    }

    let priceFor = (m: Movie,days:number): number => {

        return m.price() + additionalCostFor(days,m.minRentDays(), m.additionaCostPerDay())
    };

    it('rent new release movie one day', () => {
        expect(priceFor(new NewReleaseMovie(),1)).toEqual( 3.0)
    });

    it('rent new release movie two day', () => {
        expect(priceFor(new NewReleaseMovie(),2)).toEqual( 6.0)
    });

    it('rent children movie one day', () => {
        expect(priceFor(new ChildrenMovie(),1)).toEqual( 1.5)
    });

    it('rent children movie one day', () => {
        expect(priceFor(new ChildrenMovie(),2)).toEqual( 1.5)
    });

    it('rent children movie one day', () => {
        expect(priceFor(new ChildrenMovie(),4)).toEqual( 3.0)
    });



});