/**
 * @jest-environment jsdom
 */

const { getAnswer, loopElementClass, loopInputQuestion } = require('./main_v1.0');

afterEach(() => {
    jest.clearAllMocks();
})

const val = jest.fn();
const push = jest.fn();
const map = jest.fn();

window.$ = window.jQuery = jest.fn(() => ({
    val
}));

const arrayAnswer = [
    { id: '0', type: 'Chọn nhiều đáp án', valid: false, obligatory: 'Bắt buộc', answer: 'ádadssas\nsdaf\nadsfasd\ndà\n#ádf' },
    { id: '1', type: 'Chọn 1 đáp án', valid: false, obligatory: 'Không bắt buộc', answer: 'ádadssas\nsdaf\nadsfasd\ndà\n#ádf' },
];


test("Trả lời hết các câu", () => {
    let stepView = 1;
    let elementClass = ".class-awing" + stepView;
    window.$ = window.jQuery = jest.fn(() => ({
        length: 2,
        checked: true
    }));
    let getAnswer1 = getAnswer(arrayAnswer, elementClass, stepView);
    expect(getAnswer1[1].valid).toEqual(true);
});

test("Không trả lời hết các câu", () => {
    let stepView = 1;
    let elementClass = ".class-awing" + stepView;
    window.$ = window.jQuery = jest.fn(() => ({
        length: 1,
        checked: true
    }));
    let getAnswer1 = getAnswer(arrayAnswer, elementClass, stepView);
    expect(getAnswer1[1].valid).toEqual(false);
});