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

for (let i = 0; i < textFields3.length; i++) {
    textAddHtml += '<li class="mt-75"> <p class="fw-b lh-15" style="text-align: justify;">' + textFields3[i].ask + '</p> <div class="question2 mt-75"> <form class="q-form">';
    if (textFields3[i].type === 'checkbox') {

        var tlCheckbox = textFields3[i].answer;
        var myArrayCheckbox = tlCheckbox.split("\n");
        for (let j = 0; j < myArrayCheckbox.length; j++) {
            if (myArrayCheckbox[j].includes('lc')) {
                var myArrayCheckbox2 = myArrayCheckbox[j].split("lc");
                console.log(myArrayCheckbox2);

                textAddHtml += '<div class="ask d1-flex mb-1r "> <input type="checkbox" id="cauhoi' + i + j + '"' + 'name="checkbox' + i + '"' + ' value="' + j + '"' + 'class="mt-3px answer"> <label for="cauhoi' + i + j + '" class="textA"> <p style="color:red">' + myArrayCheckbox2[1] + '</p></label></div>' +
                    '<div id="khac' + i + j + '"' + 'style="margin-left:30px;">' +
                    '<textarea placeholder="Vui lòng điền thêm thông tin tại đây" class="text-area textA" id="diffi" required></textarea> </div>';

            } else {

                textAddHtml += '<div class="ask d1-flex mb-1r "> <input type="checkbox" id="cauhoi' + i + j + '"' + 'name="checkbox' + i + '"' + ' value="' + j + '"' + 'class="mt-3px answer"> <label for="cauhoi' + i + j + '" class="textA"> <p style="color:blue">' + myArrayCheckbox[j] + '</p></label></div>';

            }
        }
        textAddHtml += '</li>';

    } else {
        var tlRadio = textFields3[i].answer;
        var myArrayRadio = tlRadio.split("\n");
        for (let k = 0; k < myArrayRadio.length; k++) {

            if (myArrayRadio[k].includes('lc')) {
                var myArrayCheckbox3 = myArrayRadio[k].split("lc");

                textAddHtml += '<div class="ask d1-flex mb-1r "> <input type="radio" id="cauhoi' + i + k + '"' + 'name="radio' + i + '"' + ' value="' + k + '"' + 'class="mt-3px answer"> <label for="cauhoi' + i + k + '" class="textA"> <p style="color:red">' + myArrayCheckbox3[1] + '</p></label></div>' +
                    '<div id="khac' + i + k + '"' + 'style="margin-left:30px;">' +
                    '<textarea placeholder="Vui lòng điền thêm thông tin tại đây" class="text-area textA" id="diffi" required></textarea> </div>';

            } else {

                textAddHtml += '<div class="ask d1-flex   mb-1r "> <input type="radio" id="cauhoi' + i + k + '"' + 'name="radio' + i + '"' + ' value="' + k + '"' + ' class="mt-3px answer"> <label for="cauhoi' + i + k + '" class="textA"> <p style="color:green">' + myArrayRadio[k] + '</p></label></div>';
            }

        }
        textAddHtml += '</li>';
        console.log(textFields3[i]);
    }
}
console.log(textAddHtml);
$("#q-scroll .list-question").html(textAddHtml);

var newtextFields3 = textFields3.map(changeField);

function changeField(textFields3) {
    return {
        type: textFields3.type,
        cauhoi: textFields3.ask,
        traloi: textFields3.answer.split("\n"),
    };
};


console.log(newtextFields3);

function goToHomePage() {
    for (let h = 0; h < textFields3.length; h++) {
        var test = 'input[name="cauhoi' + h + '"]';
        console.log(test);
        if ($(test).is(':checked')) {
            $('p').attr("text-transform", "uppercase!important");
        } else {
            $('p').attr("text-transform", "capitalize!important");
        }
    }
    var valuecc = [];

    $('input:checked').each(function() {
        valuecc.push($(this).val());
    });
    console.log(valuecc);
}