/**
 * @jest-environment jsdom
 */

const { showHideDescription } = require('../main_v1.0');

let show = jest.fn();
let val = jest.fn();
let hide = jest.fn();

window.$ = window.jQuery = jest.fn(() => ({
    show,
    val,
    hide
}));

test("show", () => {
    jest.clearAllMocks();
    showHideDescription("elementID", true, "elementArea");
    expect(show.mock.calls.length).toBe(1);
    expect(val.mock.calls.length).toBe(0);
});

test("show", () => {
    jest.clearAllMocks();
    showHideDescription("elementID", false, "inputName");
    expect(show.mock.calls.length).toBe(0);
    expect(val.mock.calls.length).toBe(1);
});