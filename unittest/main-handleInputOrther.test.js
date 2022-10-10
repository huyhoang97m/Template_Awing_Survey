/**
 * @jest-environment jsdom
 */
const { handleInputOrther, showHideDescription } = require('../main_v1.0');

let show = jest.fn();
let val = jest.fn();
let hide = jest.fn();
window.$ = window.jQuery = jest.fn(() => ({
    show,
    val,
    hide
}));

test("Chọn nhiều đáp án", () => {
    jest.clearAllMocks();
    let type = 'Chọn nhiều đáp án';
    let stepView = 1;
    var answers = 'đáp án 1 \n #đán áp 2';
    handleInputOrther(type, answers, 0, 1, stepView, "#");
    expect(show.mock.calls.length).toBe(0);
    expect(val.mock.calls.length).toBe(1);
});
test("Chọn 1 đáp án", () => {
    jest.clearAllMocks();
    let type = 'Chọn 1 đáp án';
    let stepView = 1;
    var answers = 'đáp án 1 \n #đán áp 2 \n #đáp án 3 \n #đáp án 4';
    let answerOrtherKey = '#';
    let answerKey = '\n';
    handleInputOrther(type, answers, 0, 1, stepView, answerKey, answerOrtherKey);
    expect(show.mock.calls.length).toBe(0);
    expect(val.mock.calls.length).toBe(3);
});