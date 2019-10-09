import {compose} from "../source/domain/compose";

describe('Video Store', function () {

    it('compose two function', () => {

        let f = (x: string): string => `f(${x})`
        let g = (x: string): string => `g(${x})`

        let gfx: (x: string) => string = compose(f, g)

        expect(gfx("value")).toEqual("g(f(value))")
    });
});