"use strict";

$('#q-scroll').scroll(function () {
  var h = $(this)[0].scrollHeight;
  var y = $(this).scrollTop();
  var q = h - $(this).outerHeight() - 48;
  console.log(y, q);

  if (y > q) {
    $('#loadMore').hide();
  } else {
    $('#loadMore').show();
  }
});
$(function () {
  $('#flexCheckChecked8').click(function () {
    $('#khac').toggle(200);
  });
});

function goToHomePage() {
  var eventObject = {
    question1: '',
    question2: '',
    question3: ''
  };
  var question1 = $('input[name=ageradio]:checked').val();
  var question2 = $('input[name=gender]:checked').val();
  var question3 = [];
  $("input[name=question3]:checked").each(function () {
    question3.push($(this).val());
  });

  if (question1 != null && question2 != null && question3.length > 0) {
    var dien = $('#diffi').val();

    if ($('#flexCheckChecked8').is(":checked")) {
      if (!dien.trim()) {
        $('.page2').removeClass('d-none');
        return;
      } else {
        var question3F = $('#flexCheckChecked8:checked').val() + "-" + dien;
        question3.pop();
        question3.push(question3F);
      }
    } // eventObject.question1 = question1;
    // eventObject.question2 = question2;
    // eventObject.question3 = question3;
    // postAnalyticEvent("survey", JSON.stringify(eventObject));
    // nextView();


    alert(question1 + question2 + question3);
  } else {
    $('.page2').removeClass('d-none');
    $("#btnCheck").attr("disabled", 'true');
    setTimeout(function () {
      $("#btnCheck").attr("disabled");
    }, 2000);
  }
}

;

function comeBack() {
  $('.page2').addClass('d-none');
  $("#btnCheck").removeAttr("disabled", 'true');
}

;