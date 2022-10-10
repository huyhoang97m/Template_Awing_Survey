/**
 * @jest-environment jsdom
 */

const { generateSurvey } = require('./main_v1.0');

beforeEach(() => {
    jest.restoreAllMocks();
});

var stepView = 1;
var answerOrtherKey = '#';
var answerKey = '\n';

const arrayQuestions1 = [
    { obligatory: 'Không bắt buộc', type: 'Chọn 1 đáp án', ask: 'Anh/Chị đánh giá thế nào về trải nghiệm Free Wi-Fi?', answer: 'Rất hài lòng' }
];

const arrayQuestions2 = [
    { obligatory: 'Bắt buộc', type: 'Chọn nhiều đáp án', ask: 'câu 2', answer: 'ádadssas\nsdaf\nadsfasd\ndà\n#ádf' },
];

const arrayQuestions3 = [
    { obligatory: 'Bắt buộc', type: 'Chọn nhiều đáp án', ask: 'câu 2', answer: 'ádadssas\nsdaf\nadsfasd\ndà\n#ádf' },
    { obligatory: 'Bắt buộc', type: 'Chọn 1 đáp án', ask: 'Test 2', answer: 'abc' }
];
const arrayQuestions4 = [
    { obligatory: 'Bắt buộc', type: 'Chọn nhiều đáp án', ask: 'câu 2', answer: 'ádadssas\nsdaf\nadsfasd\ndà\n#ádf' },
    { obligatory: 'Bắt buộc', type: 'Chọn 1 đáp án', ask: 'Test 2', answer: 'abc' },
    { obligatory: 'Không bắt buộc', type: 'Chọn 1 đáp án', ask: 'Anh/Chị đánh giá thế nào về trải nghiệm Free Wi-Fi?', answer: 'Rất hài lòng\nHài lòng\nBình thường\n#Chưa hài lòng' }
];
const arrayQuestions5 = [
    { obligatory: 'Bắt buộc', type: 'Chọn nhiều đáp án', ask: 'câu 2', answer: 'ádadssas\nsdaf\nadsfasd\ndà\n#ádf' },
    { obligatory: 'Bắt buộc', type: 'Chọn 1 đáp án', ask: 'Test 2', answer: 'abc' },
    { obligatory: 'Không bắt buộc', type: 'Chọn 1 đáp án', ask: 'Anh/Chị đánh giá thế nào về trải nghiệm Free Wi-Fi?', answer: 'Rất hài lòng\nHài lòng\nBình thường\n#Chưa hài lòng' },
    { obligatory: 'Không bắt buộc', type: 'Chọn 1 đáp án', ask: 'Anh/Chị đánh giá thế nào về trải nghiệm Free Wi-Fi?', answer: 'Rất hài lòng\nHài lòng\nBình thường\n#Chưa hài lòng' }
];

afterEach(() => {
    jest.clearAllMocks();
})

test("Kết quả câu hỏi không bắt buộc", () => {
    jest.clearAllTimers();
    let mockElement;
    let test1 = generateSurvey(arrayQuestions1, stepView, answerKey, answerOrtherKey);
    let newNode1 = document.createElement('div');
    newNode1.innerHTML = test1.html;
    document.body.appendChild(newNode1);
    let testaaray1 = test1.arrayAnswer;
    expect(testaaray1[0].questionValid).toBe('Không bắt buộc');
});

test("Kết quả loại câu hỏi bắt buộc", () => {
    jest.clearAllTimers();
    let mockElement;
    let test2 = generateSurvey(arrayQuestions2, stepView, answerKey, answerOrtherKey);
    let newNode2 = document.createElement('div');
    newNode2.innerHTML = test2.html;
    document.body.appendChild(newNode2);
    let testaaray2 = test2.arrayAnswer;
    expect(testaaray2[0].questionValid).toBe('Bắt buộc');
});

test("Kết quả loại 1 đáp án", () => {
    jest.clearAllTimers();
    let mockElement;
    let test3 = generateSurvey(arrayQuestions1, stepView, answerKey, answerOrtherKey);
    let newNode1 = document.createElement('div');
    newNode1.innerHTML = test3.html;
    document.body.appendChild(newNode1);
    let testaaray1 = test3.arrayAnswer;
    expect(testaaray1[0].type).toBe('Chọn 1 đáp án');
});

test("Kết quả loại Chọn nhiều đáp án", () => {
    jest.clearAllTimers();
    let mockElement;
    let test4 = generateSurvey(arrayQuestions2, stepView, answerKey, answerOrtherKey);
    let newNode2 = document.createElement('div');
    newNode2.innerHTML = test4.html;
    document.body.appendChild(newNode2);
    let testaaray2 = test4.arrayAnswer;
    expect(testaaray2[0].type).toBe('Chọn nhiều đáp án');
});

test("Kết quả có một đáp án để chọn", () => {
    jest.clearAllTimers();
    let mockElement;
    let test5 = generateSurvey(arrayQuestions3, stepView, answerKey, answerOrtherKey);
    let newNode1 = document.createElement('div');
    newNode1.innerHTML = test5.html;
    document.body.appendChild(newNode1);
    let testaaray1 = test5.arrayAnswer;
    expect(document.querySelectorAll("#awing-survey-1 input").length).toBe(1);
});

test("Kết quả có nhiều đáp án để chọn", () => {
    jest.clearAllTimers();
    jest.clearAllMocks();
    let mockElement;
    let test6 = generateSurvey(arrayQuestions4, stepView, answerKey, answerOrtherKey);
    document.body.innerHTML = "";
    let newNode2 = document.createElement('div');
    newNode2.innerHTML = test6.html;
    document.body.appendChild(newNode2);
    let testaaray2 = test6.arrayAnswer;
    expect(document.querySelectorAll("#awing-survey-0 input").length).toBe(5);
    expect(document.querySelectorAll("#awing-survey-2 input").length).toBe(4);
});

test("Kết quả không có kết quả điền thêm thông tin", () => {
    jest.clearAllTimers();
    let mockElement;
    let test7 = generateSurvey(arrayQuestions3, stepView, answerKey, answerOrtherKey);
    let newNode1 = document.createElement('div');
    newNode1.innerHTML = test7.html;
    document.body.appendChild(newNode1);
    let testaaray1 = test7.arrayAnswer;
    expect(document.querySelectorAll("#awing-survey-1 textarea").length).toBe(0);
});

test("Kết quả có 1 hoặc nhiều đáp án có kết quả điền thêm thông tin", () => {
    jest.clearAllTimers();
    let mockElement;
    let test8 = generateSurvey(arrayQuestions5, stepView, answerKey, answerOrtherKey);
    let newNode2 = document.createElement('div');
    newNode2.innerHTML = test8.html;
    document.body.appendChild(newNode2);
    let testaaray2 = test8.arrayAnswer;
    expect(document.querySelectorAll("#awing-survey-3 textarea").length).toBe(1);
});