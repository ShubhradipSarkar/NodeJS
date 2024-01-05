function add(a, b) {
    return a + b;
}
function sub(a, b) {
    return a - b;
}
function div(a, b) {
    if (b === 0)
        return "Infinity";
    else
        return (a / b);
}
function mul(a, b) {
    return a * b;
}
module.exports = { add: add, sub: sub, div: div, mul: mul };
