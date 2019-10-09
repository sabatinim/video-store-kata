
describe('It works', function () {

    class NewReleaseMovie {
        public basePrice = 3.0;
    }
    let priceFor = (m: NewReleaseMovie,days:number): number => {

        const minRentDay = 1;
        const additionalCostPerDay = 3.0;
        let additionalCost=0.0;

        if(days>minRentDay)
        {
            const additionalDays = days - minRentDay
            additionalCost = additionalCostPerDay*additionalDays;
        }

        return m.basePrice + additionalCost
    };

    it('rent new release movie one day', () => {
        expect(priceFor(new NewReleaseMovie(),1)).toEqual( 3.0)
    });

    it('rent new release movie two day', () => {
        expect(priceFor(new NewReleaseMovie(),2)).toEqual( 6.0)
    });

});