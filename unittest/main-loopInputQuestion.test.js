/**
 * @jest-environment jsdom
 */

const { loopInputQuestion } = require('../main_v1.0');

beforeEach(() => {
    jest.restoreAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
})


const removeClass = jest.fn();
const addClass = jest.fn();

var inputQuestion = [{
    checked: true,
    value: "input#1input-question-04.traloi0.1khac04"
}]
var inputQuestion1 = [{
    checked: true,
    value: "input#1input-question-00.traloi0"
}]
var inputQuestion2 = [{
        checked: true,
        value: "input#1input-question-00.traloi0"
    },
    {
        checked: true,
        value: "input#1input-question-01.traloi0"
    }
]


test("Không có điền thêm", () => {
    jest.clearAllTimers();
    let stepView = 1;
    let el = 0;
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(() => "abc"),
        trim: jest.fn(() => false),
        removeClass,
        addClass,
        length: 0
    }));
    let loopInputQuestion1 = loopInputQuestion(inputQuestion1, el, stepView, "Bắt buộc");
    inputQuestion[0].checked;
    expect(removeClass.mock.calls.length).toBe(0);
    expect(addClass.mock.calls.length).toBe(0);
    expect(loopInputQuestion1.valids).toEqual([true]);
});

test("Có 1 và điền đầy đủ", () => {
    jest.clearAllTimers();
    let stepView = 1;
    let el = 0;
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(() => "abc"),
        trim: jest.fn(() => true),
        removeClass,
        addClass,
        length: 1
    }));
    inputQuestion[0].checked;
    let loopInputQuestion1 = loopInputQuestion(inputQuestion, el, stepView, "Bắt buộc");
    expect(removeClass.mock.calls.length).toBe(1);
    expect(addClass.mock.calls.length).toBe(0);
    expect(loopInputQuestion1.valids).toEqual([true]);
});

test("Có 1 nhưng không điền đầy đủ", () => {
    jest.clearAllTimers();
    let stepView = 1;
    let el = 0;
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(),
        trim: jest.fn(() => true),
        removeClass,
        addClass,
        length: 1
    }));
    inputQuestion[0].checked;
    let loopInputQuestion1 = loopInputQuestion(inputQuestion, el, stepView, "Bắt buộc");
    expect(removeClass.mock.calls.length).toBe(0);
    expect(addClass.mock.calls.length).toBe(1);
    expect(loopInputQuestion1.valids).toEqual([false]);
});


test("Nhiều câu Không có điền thêm", () => {
    jest.clearAllTimers();
    let stepView = 1;
    let el = 0;
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(() => "abc"),
        trim: jest.fn(() => false),
        removeClass,
        addClass,
        length: 0
    }));
    inputQuestion[0].checked;
    let loopInputQuestion1 = loopInputQuestion(inputQuestion2, el, stepView, "Bắt buộc");
    expect(removeClass.mock.calls.length).toBe(0);
    expect(addClass.mock.calls.length).toBe(0);
    expect(loopInputQuestion1.valids).toEqual([true, true]);
});