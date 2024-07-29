use crate::utils::compose;

#[test]
fn test_compose() {
    let f = |value: String| format!("f({})", value);
    let g = |value: String| format!("g({})", value);
    let result = compose(f, g);

    assert_eq!(result(String::from("x")), "g(f(x))")
}