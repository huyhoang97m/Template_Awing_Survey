/**
 * @jest-environment jsdom
 */

const { loopElementClass } = require('../main_v1.0');

afterEach(() => {
    jest.clearAllMocks();
})

const val = jest.fn();

window.$ = window.jQuery = jest.fn(() => ({
    val
}));

var arrayAnswer = [{
    id: 0,
    type: "Chọn nhiều đáp án",
    valid: false,
    questionValid: "Bắt buộc",
    answer: [],
    value: 1
}]
var arrayAnswer2 = [{
    id: 0,
    type: "Chọn nhiều đáp án",
    valid: false,
    questionValid: "Không bắt buộc",
    answer: [],
    value: 1
}]

test("không trả lời câu trả hỏi bắt buộc", () => {
    let stepView = 1;
    let elementClassLength = 1;
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(),
        removeClass: jest.fn(),
        addClass: jest.fn(),
        length: 0,
        checked: true
    }));
    let loopElementClass1 = loopElementClass(elementClassLength, arrayAnswer, stepView);
    expect(loopElementClass1[0].valid).toEqual(false);
});

test("không trả lời câu trả hỏi không bắt buộc", () => {
    let stepView = 1;
    let elementClassLength = 1;
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(),
        removeClass: jest.fn(),
        addClass: jest.fn(),
        length: 0,
        checked: true
    }));
    let loopElementClass1 = loopElementClass(elementClassLength, arrayAnswer2, stepView);
    expect(loopElementClass1[0].valid).toEqual("true");
});

test("Có trả lời", () => {
    let stepView = 1;
    let elementClassLength = 1;
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(() => "abc"),
        removeClass: jest.fn(),
        addClass: jest.fn(),
        length: 1,
        checked: true
    }));
    let loopElementClass1 = loopElementClass(elementClassLength, arrayAnswer, stepView);
    expect(loopElementClass1[0].valid).toEqual(true);
});