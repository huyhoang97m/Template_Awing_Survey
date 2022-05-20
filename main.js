let stepView = 1;

const textFields3 = [
    { type: 'checkbox', ask: 'Cau hoi 1', answer: 'cau tra lpo' },
    { type: 'radio', ask: 'Cau hoi 2', answer: 'dafc \n between sdasdsasda \n lchtml-worpress' },
    { type: 'checkbox', ask: 'Cau hoi 3', answer: 'cau 3 \n lcau333' },
    { type: 'radio', ask: 'Cau hoi 4', answer: 'cau 4 \n cau 4.1 \n 4.2' },
    { type: 'radio', ask: 'Cau hoi 5', answer: 'cau ans \n cau fsg4ws \n gsdfvsd' },
    { type: 'checkbox', ask: 'Cau hoi 6', answer: 'cau ans \n cau lcfsg4ws \n dfvsd' }
];

// var textFields3 = { ten_truong_3 };

var textAddHtml = '';
var arrayAnswer = [];
for (let i = 0; i < textFields3.length; i++) {
    textAddHtml += '<li class="mt-75"> <p class="fw-b lh-15" style="text-align: justify;">' + textFields3[i].ask + '</p> <div class="question2 mt-75"> <form class="q-form class-awing' + stepView + '" id="awing-survey-' + i + '">';
    indexAnswerOrther = -1;
    var tlRadio = textFields3[i].answer;
    var myArrayRadio = tlRadio.split("\n");
    for (let j = 0; j < myArrayRadio.length; j++) {
        if (myArrayRadio[j].includes('lc')) {
            var myArrayCheckbox3 = myArrayRadio[j].split("lc");
            indexAnswerOrther = j;
            textAddHtml += '<div class="ask d1-flex mb-1r "> <input type="' + textFields3[i].type + '" class="traloi' + i + ' khac' + i + '" id="cauhoi' + i + j + '"' + 'name="question' + i + '"' + ' value="' + getAlphabet(j) + '"' + 'class="mt-3px answer" onclick="showHideTextarea()"> <label for="cauhoi' + i + j + '" class="textA"> <p style="color:red">' + myArrayCheckbox3[1] + '</p></label></div>' +
                '<div id="khac' + i + j + '"' + 'style="margin-left:30px;" class="">' +
                '<textarea placeholder="Vui lòng điền thêm thông tin tại đây" class="text-area textA other-text" id="khac' + i + '" required></textarea> </div>';

        } else {

            textAddHtml += '<div class="ask d1-flex   mb-1r "> <input type="' + textFields3[i].type + '" class="traloi' + i + '" id="cauhoi' + i + j + '"' + 'name="question' + i + '"' + ' value="' + getAlphabet(j) + '"' + ' class="mt-3px answer"> <label for="cauhoi' + i + j + '" class="textA"> <p style="color:green">' + myArrayRadio[j] + '</p></label></div>';
        }

    }
    arrayAnswer.push({
        id: i,
        indexAnswerOrther: indexAnswerOrther,
        type: textFields3[i].type,
        valid: false,
        answer: []
    })
    textAddHtml += '</form> </div> </li>';
}
// console.log(textAddHtml);
$("#q-scroll .list-question").html(textAddHtml);

// var newtextFields3 = textFields3.map(changeField);

// function changeField(textFields3) {
//     return {
//         type: textFields3.type,
//         cauhoi: textFields3.ask,
//         traloi: textFields3.answer.split("\n"),
//     };
// };


// console.log(arrayAnswer);

function goToHomePage() {
    // var valuecc = [];

    // $('.q-form').each(function(index) {
    //     // console.log($(this));
    //     console.log(index);
    //     // valuecc.push($(this).val());
    // });
    // console.log(valuecc);

    arrayAnswer = getAnswer(arrayAnswer, ".class-awing" + stepView);
    console.log(arrayAnswer);

    // Validation: Tất cả valid trong arrayAnswer = true. => post dữ liệu về
    // Ngược lại hiện thông báo
}

function getAnswer(arrayAnswer, elementClass) {
    $(elementClass).each(function(index) {
        var inputName = '.traloi' + index + ':checked';
        var newAnswer = $(inputName).length;
        // if (newAnswer > 0) {
        //     arrayAnswer[index].value = newAnswer;
        //     arrayAnswer[index].valid = true;
        //     var question = []
        //     $("input[name=question" + index + "]:checked").each(function() {
        //         question.push($(this).val());
        //     });
        //     arrayAnswer[index].answer = question;
        // }
        if (newAnswer > 0) {
            arrayAnswer[index].value = newAnswer;

            let valid = false;
            var question = []

            $("input[name=question" + index + "]:checked").each(function() {
                question.push($(this).val());
            });
            arrayAnswer[index].answer = question;

            let inputNameDiff = '.khac' + index + ':checked';
            var newAnswerKhac = $(inputNameDiff).length;
            var dien = $('#khac' + index).val();

            if (newAnswerKhac > 0) {
                if (dien.trim()) {
                    valid = true;
                    var questionF = $(inputNameDiff).val() + "-" + dien;
                    question[arrayAnswer[index].indexAnswerOrther] = questionF;
                }
            } else {
                valid = true;
            }
            arrayAnswer[index].valid = valid;
        }
    });
    return arrayAnswer;
}

function getAlphabet(index) {
    return (index + 10).toString(36).toUpperCase();
}

function showHideTextarea() {
    for (let i = 0; i < textFields3.length; i++) {
        if (textFields3[i].type = 'checkbox') {
            console.log(textFields3[i].type);
            $("#khac" + i).toggle();
        } else {
            $("#khac" + i).hide();
        }
    }
}