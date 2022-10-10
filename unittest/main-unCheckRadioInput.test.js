/**
 * @jest-environment jsdom
 */

const { unCheckRadioInput } = require('./main_v1.0');

afterEach(() => {
    jest.clearAllMocks();
})
const prop = jest.fn();
test("Check Radio Input", () => {
    let inputName = '#1input-question-00';
    let radioCheckeds = {
        '#1input-question-00': true
    };
    window.$ = window.jQuery = jest.fn(() => ({
        prop,
        length: 1
    }));
    let unCheckRadioInput1 = unCheckRadioInput(inputName, radioCheckeds);
    expect(prop.mock.calls.length).toBe(1);
});

test("Un Check Radio Input", () => {
    let inputName = '#1input-question-00';
    let radioCheckeds = {
        '#1input-question-00': false
    };
    window.$ = window.jQuery = jest.fn(() => ({
        prop,
        length: 1
    }));
    let unCheckRadioInput1 = unCheckRadioInput(inputName, radioCheckeds);
    expect(prop.mock.calls.length).toBe(0);
});