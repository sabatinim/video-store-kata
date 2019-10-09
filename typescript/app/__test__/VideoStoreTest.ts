

describe('It works', function () {

    interface Movie{
        price():number
    }
    class NewReleaseMovie implements Movie{
        public basePrice = 3.0;

        price():number {
            return this.basePrice
        }
    }
    class ChildrenMovie implements Movie {
        price(): number {
            return 1.5;
        }
    }

    let priceFor = (m: Movie,days:number): number => {

        const minRentDay = 1;
        const additionalCostPerDay = 3.0;
        let additionalCost=0.0;

        if(days>minRentDay)
        {
            const additionalDays = days - minRentDay
            additionalCost = additionalCostPerDay*additionalDays;
        }

        return m.price() + additionalCost
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


});