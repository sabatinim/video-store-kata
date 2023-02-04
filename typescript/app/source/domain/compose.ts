export const compose = <A,B,C>(
    f: (x: A) => B,
    g: (y: B) => C):
    (x: A) => C => {
    return (x) => g(f(x))
};