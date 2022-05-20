let stepView = 1;
let answerOrtherKey = 'lc';
let answerKey = '\n';

const arrayQuestions = [
    { type: 'checkbox', ask: 'Cau hoi 1', answer: 'cau tra lpo' },
    { type: 'radio', ask: 'Cau hoi 2', answer: 'dafc \n between sdasdsasda \n lchtml-worpress \n cau lcfsg4ws' },
    { type: 'checkbox', ask: 'Cau hoi 3', answer: 'cau 3 \n lcau333' },
    { type: 'radio', ask: 'Cau hoi 4', answer: 'cau 4 \n cau 4.1 \n 4.2' },
    { type: 'radio', ask: 'Cau hoi 5', answer: 'cau ans \n cau fsg4ws \n gsdfvsd' },
    { type: 'checkbox', ask: 'Cau hoi 6', answer: 'cau ans \n cau lcfsg4ws \n cau lcfsg4ws \n dfvsd ' }
];
let survey = generateSurvey(arrayQuestions);
$("#q-scroll .list-question").html(survey.html);

function goToHomePage() {
    var newArrayAnswer = getAnswer(survey.arrayAnswer, ".class-awing" + stepView);
    console.log(newArrayAnswer);
}

function generateSurvey(arrayQuestions) {
    var html = '';
    var arrayAnswer = [];
    for (let i = 0; i < arrayQuestions.length; i++) {
        html += '<li class="mt-75"> <p class="fw-b lh-15" style="text-align: justify;">' + arrayQuestions[i].ask + '</p> <div class="question2 mt-75"> <form class="q-form class-awing' + stepView + '" id="awing-survey-' + i + '">';
        var tlRadio = arrayQuestions[i].answer;
        var myArrayRadio = tlRadio.split(answerKey);
        for (let j = 0; j < myArrayRadio.length; j++) {
            if (myArrayRadio[j].includes(answerOrtherKey)) {
                var myArrayCheckbox3 = myArrayRadio[j].split(answerOrtherKey);
                html += '<div class="ask d1-flex mb-1r "> <input id="' + stepView + 'input-question-' + i + j + '" onclick="handleInputOrther(' + i + ',' + j + ')" type="' + arrayQuestions[i].type + '" class="traloi' + i + ' ' + stepView + 'khac' + i + j + '" id="cauhoi' + i + j + '"' + 'name="' + stepView + 'question' + i + '"' + ' value="' + getAlphabet(j) + '"' + 'class="mt-3px answer"> <label for="cauhoi' + i + j + '" class="textA"> <p style="color:red">' + myArrayCheckbox3[1] + '</p></label></div>' +
                    '<div id="' + stepView + 'div-khac' + i + j + '"' + 'style="margin-left:30px;display:none" >' +
                    '<textarea placeholder="Vui lòng điền thêm thông tin tại đây" class="text-area textA" id="' + stepView + 'khac' + i + j + '" required></textarea> </div>';
            } else {
                html += '<div class="ask d1-flex   mb-1r "> <input onclick="handleInputOrther(' + i + ',' + j + ')" type="' + arrayQuestions[i].type + '" class="traloi' + i + '" id="cauhoi' + i + j + '"' + 'name="' + stepView + 'question' + i + '"' + ' value="' + getAlphabet(j) + '"' + ' class="mt-3px answer"> <label for="cauhoi' + i + j + '" class="textA"> <p style="color:green">' + myArrayRadio[j] + '</p></label></div>';
            }
        }
        html += '</form> </div> </li>';
        arrayAnswer.push({
            id: i,
            type: arrayQuestions[i].type,
            valid: false,
            answer: []
        })
    }
    return { html, arrayAnswer };
}

function getAnswer(arrayAnswer, elementClass) {
    var newArrayAnswer = arrayAnswer.map((x) => {
        x.valid = false;
        x.answer = [];
        return x;
    })
    $(elementClass).each(function(index) {
        var inputName = '.traloi' + index + ':checked';
        var newAnswer = $(inputName).length;
        if (newAnswer > 0) {
            newArrayAnswer[index].value = newAnswer;
            var question = []
            let valids = [];
            $("input[name=" + stepView + "question" + index + "]").each(function(newIndex) {
                if (this.checked) {
                    let inputNameDiff = '.' + stepView + 'khac' + index + newIndex + ':checked';
                    var newAnswerKhac = $(inputNameDiff).length;
                    var dien = $('#' + stepView + 'khac' + index + newIndex).val();

                    if (newAnswerKhac > 0) {
                        if (dien.trim()) {
                            valids.push(true);
                            var questionF = $(inputNameDiff).val() + "-" + dien;
                            question.push(questionF);;
                        } else valids.push(false);
                    } else {
                        valids.push(true);
                        question.push(this.value);
                    }

                }
            });
            newArrayAnswer[index].answer = question;
            newArrayAnswer[index].valid = !valids.includes(false);
        }
    });
    return newArrayAnswer;
}

function getAlphabet(index) {
    return (index + 10).toString(36).toUpperCase();
}

function handleInputOrther(questionIndex, answerIndex) {
    if (arrayQuestions[questionIndex].type == 'checkbox') {
        let inputName = '#' + stepView + 'input-question-' + questionIndex + answerIndex;
        let arreaName = '#' + stepView + 'khac' + questionIndex + answerIndex;
        let elementId = '#' + stepView + 'div-khac' + questionIndex + answerIndex;
        let isShow = $(inputName + ':checkbox:checked').length > 0;
        showHideDescription(elementId, isShow, arreaName);
    }
    if (arrayQuestions[questionIndex].type == 'radio') {
        arrayQuestions[questionIndex].answer.split(answerKey).map((x, index) => {
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

function showHideDescription(elementId, isShow, elementArea) {
    if (isShow) {
        $(elementId).show();
    } else {
        $(elementArea).val("");
        $(elementId).hide();
    }
}