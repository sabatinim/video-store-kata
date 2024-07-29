pub fn compose<X, Y, Z>(f: impl Fn(X) -> Y + 'static,
                        g: impl Fn(Y) -> Z + 'static) -> Box<dyn Fn(X) -> Z> {
    Box::new(move |x: X| g(f(x)))
}
