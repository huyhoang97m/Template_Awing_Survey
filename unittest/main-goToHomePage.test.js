/**
 * @jest-environment jsdom
 */

const { goToHomePage, getAnswer, generateSurvey } = require('./main_v1.0');

afterEach(() => {
    jest.clearAllMocks();
})
window.$ = window.jQuery = jest.fn(() => ({
    removeClass
}));

var stepView = 1;
var answerOrtherKey = '#';
var answerKey = '\n';
var arg1 = [{ "obligatory": "Bắt buộc", "type": "Chọn nhiều đáp án", "ask": "câu 2", "answer": "ádadssas\nsdaf" }];
var event = {
    dataset: {
        arg1: arg1
    }
};

const removeClass = jest.fn();

test("Không trả lời", () => {

    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(),
        removeClass,
        addClass: jest.fn(),
        length: 0
    }));
    let inputGoHomePage = event.dataset.arg1;
    let goToHomePage1 = goToHomePage(inputGoHomePage, stepView, answerKey, answerOrtherKey);
    expect(removeClass.mock.calls.length).toBe(1);
});

test("Trả lời", () => {
    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(),
        removeClass,
        addClass: jest.fn(),
        length: 1
    }));
    let inputGoHomePage = event.dataset.arg1;
    let goToHomePage1 = goToHomePage(inputGoHomePage, stepView, answerKey, answerOrtherKey);
    expect(removeClass.mock.calls.length).toBe(0);
});

test("Trả lời nhưng không đầy đủ", () => {
    let arg1 = [
        { "obligatory": "Bắt buộc", "type": "Chọn nhiều đáp án", "ask": "câu 1", "answer": "ádadssas\nsdaf" },
        { "obligatory": "Bắt buộc", "type": "Chọn một đáp án", "ask": "câu 2", "answer": "traloi\nádadssas\nsdaf" }
    ];
    let event = {
        dataset: {
            arg1: arg1
        }
    };

    window.$ = window.jQuery = jest.fn(() => ({
        val: jest.fn(),
        removeClass,
        addClass: jest.fn(),
        length: 1
    }));
    let inputGoHomePage = event.dataset.arg1;
    let goToHomePage1 = goToHomePage(inputGoHomePage, stepView, answerKey, answerOrtherKey);
    expect(removeClass.mock.calls.length).toBe(1);
});