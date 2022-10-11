/**
 * @jest-environment jsdom
 */

const { comeBack } = require('../main_v1.0');

let addClass= jest.fn();
let removeAttr = jest.fn();
afterEach(() => {
    jest.clearAllMocks();
})
window.$ = window.jQuery = jest.fn(() => ({
    addClass,
    removeAttr
}));

test("No click", () => {
    expect(addClass.mock.calls.length).toBe(0);
    expect(removeAttr.mock.calls.length).toBe(0);
});
test("Click", () => {
    comeBack();
    expect(addClass.mock.calls.length).toBe(1);
    expect(removeAttr.mock.calls.length).toBe(1); 
});