function generateSurvey(arrayQuestions, stepView, answerKey, answerOrtherKey) {
    var html = '';
    var arrayAnswer = [];
    var typeAsk = '';
    for (let i = 0; i < arrayQuestions.length; i++) {
        html += '<li class="mt-75"> <p class="fw-b lh-15" style="text-align: justify;">' + arrayQuestions[i].ask + '</p> <div class="question2 mt-75"> <form class="q-form class-awing' + stepView + '" id="awing-survey-' + i + '">';
        var tlRadio = arrayQuestions[i].answer;
        var arrayType = arrayQuestions[i].type;
        var arrayQuestionsObligatory = arrayQuestions[i].obligatory;
        if (arrayType == 'Chọn 1 đáp án') {
            typeAsk = 'radio';
        } else {
            typeAsk = 'checkbox';
        }
        if (arrayQuestionsObligatory == 'Không bắt buộc') {
            classAsk = 'noobl';
        } else {
            classAsk = ' ';
        }
        var myArrayRadio = tlRadio.split(answerKey);
        for (let j = 0; j < myArrayRadio.length; j++) {
            if (myArrayRadio[j].includes(answerOrtherKey)) {
                var myArrayCheckbox3 = myArrayRadio[j].split(answerOrtherKey);
                html += '<div class="ask d1-flex mb-1r "> <input id="' + stepView + 'input-question-' + i + j + '" onclick=\'handleInputOrther(' + JSON.stringify(arrayQuestions[i].type) + ',' + JSON.stringify(arrayQuestions[i].answer) + ',' + i + ',' + j + ',' + stepView + ',' + JSON.stringify(answerKey) + ',"' + answerOrtherKey + '")\' type="' + typeAsk + '" class="traloi' + i + ' ' + stepView + 'khac' + i + j + '" id="cauhoi' + i + j + '"' + 'name="' + stepView + 'question' + i + '"' + ' value="' + getAlphabet(j) + '"' + 'class="mt-3px answer"> <label for="cauhoi' + i + j + '" class="textA"> <p>' + myArrayCheckbox3[1] + '</p></label></div>' +
                    '<div id="' + stepView + 'div-khac' + i + j + '"' + 'class="mb-1r" style="margin-left:30px;display:none" >' +
                    '<textarea placeholder="Vui lòng điền thêm thông tin tại đây" class="text-area textA" id="' + stepView + 'khac' + i + j + '" required></textarea> </div>';
            } else {
                html += '<div class="ask d1-flex   mb-1r "> <input id="' + stepView + 'input-question-' + i + j + '" onclick=\'handleInputOrther(' + JSON.stringify(arrayQuestions[i].type) + ',' + JSON.stringify(arrayQuestions[i].answer) + ',' + i + ',' + j + ',' + stepView + ',' + JSON.stringify(answerKey) + ',"' + answerOrtherKey + '")\' type="' + typeAsk + '" class="traloi' + i + '" name="' + stepView + 'question' + i + '"' + ' value="' + getAlphabet(j) + '"' + ' class="mt-3px answer"> <label for="cauhoi' + i + j + '" class="textA"> <p>' + myArrayRadio[j] + '</p></label></div>';
            }
        }
        html += '</form> </div> </li>';
        arrayAnswer.push({
            id: i,
            type: arrayQuestions[i].type,
            valid: false,
            questionValid: arrayQuestions[i].obligatory,
            answer: []
        })
    }
    return { html, arrayAnswer };
}

function getAnswer(arrayAnswer, elementClass, stepView) {
    var newArrayAnswer = arrayAnswer.map((x) => {
        x.valid = false;
        x.answer = [];
        return x;
    })
    let elementClassInfo = loopElementClass($(elementClass).length, newArrayAnswer, stepView);
    // return newArrayAnswer;
    return elementClassInfo;
}

function loopElementClass(elementClassLength, arrayAnswer, stepView) {
    let newArrayAnswer = arrayAnswer;
    for (let el = 0; el < elementClassLength; el++) {
        var inputName = '.traloi' + el + ':checked';
        var newAnswer = $(inputName).length;
        var arrayObligatory = newArrayAnswer[el].questionValid;
        if (newAnswer > 0) {
            newArrayAnswer[el].value = newAnswer;
            let inputQuestion = $("input[name=" + stepView + "question" + el + "]");
            let inputQuestionInfo = loopInputQuestion(inputQuestion, el, stepView, arrayObligatory);
            newArrayAnswer[el].answer = inputQuestionInfo.question;
            newArrayAnswer[el].valid = !inputQuestionInfo.valids.includes(false);
        }
        if (arrayObligatory == 'Không bắt buộc') {
            newArrayAnswer[el].valid = 'true';
        }
    }
    return newArrayAnswer
}

function loopInputQuestion(inputQ, indexOld, stepView, arrayObligatory) {
    var result = {
        question: [],
        valids: []
    }
    for (let newIndex = 0; newIndex < inputQ.length; newIndex++) {
        if (inputQ[newIndex] && (inputQ[newIndex].checked === true)) {
            let inputNameDiff = '.' + stepView + 'khac' + indexOld + newIndex + ':checked';
            var newAnswerKhac = $(inputNameDiff).length;
            if (newAnswerKhac && newAnswerKhac > 0) {
                var dien = $('#' + stepView + 'khac' + indexOld + newIndex).val();
                if (dien && dien.trim()) {
                    result.valids.push(true);
                    var questionF = $(inputNameDiff).val() + "-" + dien;
                    result.question.push(questionF);
                    $('#' + stepView + 'khac' + indexOld + newIndex).removeClass("bdc-r");
                } else {
                    result.valids.push(false);
                    if (arrayObligatory == 'Bắt buộc') {
                        $('#' + stepView + 'khac' + indexOld + newIndex).addClass("bdc-r");
                    }
                }
            } else {
                result.valids.push(true);
                result.question.push(inputQ[newIndex].value);
            }
        }
    };
    return result;
}

function getAlphabet(index) {
    return (index + 10).toString(36).toUpperCase();
}
var radioCheckedGlobal = {}

function handleInputOrther(type, answers, questionIndex, answerIndex, stepView, answerKey, answerOrtherKey) {
    if (type == 'Chọn nhiều đáp án') {
        let inputName = '#' + stepView + 'input-question-' + questionIndex + answerIndex;
        let arreaName = '#' + stepView + 'khac' + questionIndex + answerIndex;
        let elementId = '#' + stepView + 'div-khac' + questionIndex + answerIndex;
        let isShow = $(inputName + ':checkbox:checked').length > 0;
        showHideDescription(elementId, isShow, arreaName);
    }
    if (type == 'Chọn 1 đáp án') {
        let inputCurrentName = '#' + stepView + 'input-question-' + questionIndex + answerIndex;
        unCheckRadioInput(inputCurrentName, radioCheckedGlobal);
        answers.split(answerKey).map((x, index) => {
            if (x.includes(answerOrtherKey)) {
                let inputName = '#' + stepView + 'input-question-' + questionIndex + index;
                let arreaName = '#' + stepView + 'khac' + questionIndex + index;
                let elementId = '#' + stepView + 'div-khac' + questionIndex + index;
                let isShow = $(inputName + ':radio:checked').length > 0;
                showHideDescription(elementId, isShow, arreaName);
            }
        })
    }
}


function unCheckRadioInput(inputName, radioCheckeds) {
    let isCheckedCurrent = $(inputName + ':radio:checked').length > 0;
    radioCheckeds = Object.keys(radioCheckeds).filter((key) => key === inputName).reduce((cur, key) => {
        return Object.assign(cur, {
            [key]: radioCheckeds[key]
        })
    }, {});
    var radioChecked = radioCheckeds[inputName];
    radioCheckeds[inputName] = isCheckedCurrent;
    if (radioChecked && radioChecked === true && isCheckedCurrent) {
        $(inputName).prop('checked', false);
        radioCheckeds[inputName] = false;
    }
    radioCheckedGlobal = radioCheckeds;

}

function showHideDescription(elementId, isShow, elementArea) {
    if (isShow) {
        $(elementId).show();
    } else {
        $(elementArea).val("");
        $(elementId).hide();
    }
}


function goToHomePage(inputGoHomePage, stepView, answerKey, answerOrtherKey) {

    let newGenerateSurvey = generateSurvey(inputGoHomePage,stepView,answerKey,answerOrtherKey);
    var newArrayAnswer = getAnswer(newGenerateSurvey.arrayAnswer, ".class-awing" + stepView, stepView);
    var answerArray = newArrayAnswer.map(function(item) {
        return item['answer'];
    });
    var answerResultArray = {};
    for (let t = 0; t < answerArray.length; t++) {
        var u = t + 1;
        var answerResultKey = 'Trang' + stepView + '.Question' + u;
        var answerResultValue = answerArray[t];
        answerResultArray[answerResultKey] = answerResultValue;
    }
    var validArray = newArrayAnswer.map(function(item) {
        return item['valid'];
    });
    let indexValidCheck = validArray.indexOf(false);
    if (indexValidCheck > -1) {
        $('.page2').removeClass('d-none');
    } else {
        // postAnalyticEvent("survey", JSON.stringify(answerResultArray));
        // nextView();
    }
  
}

function comeBack() {
    $('.page2').addClass('d-none');
    $("#btnCheck").removeAttr("disabled", 'true');
};

exports.comeBack = comeBack;
exports.getAlphabet = getAlphabet;
exports.generateSurvey = generateSurvey;
exports.showHideDescription = showHideDescription;
exports.getAnswer = getAnswer;
exports.handleInputOrther = handleInputOrther;
exports.goToHomePage = goToHomePage;
exports.unCheckRadioInput = unCheckRadioInput;
exports.loopElementClass = loopElementClass;
exports.loopInputQuestion = loopInputQuestion;