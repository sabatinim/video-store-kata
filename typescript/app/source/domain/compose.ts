export const compose = <TX,TY,R>(
    f: (x: TX) => TY,
    g: (y: TY) => R):
    (x: TX) => R => {
    return (x) => g(f(x))
};