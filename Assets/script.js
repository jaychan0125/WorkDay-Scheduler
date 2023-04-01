// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // 
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  // 

  var today = dayjs();
  var date = today.format('dddd, MMM D, YYYY');
  var liveDate = $('#liveDate');
  var currentHr = dayjs().hour();
  var timeBlock = $('.time-block');


  var saveBtn = $('.saveBtn');  //will return an object
  // var userText = $('.description'); //will return an object

  // console.log(saveBtn[1]);

  // console.log(saveBtn.parent('div').attr('id'));
  // // console.log(userText.val());
  // console.log(userText.parent('div').attr('id'));


  // currentBtn = $(this).parent('div').attr('id');



  saveBtn.click(function () {
    event.preventDefault();
    console.log(this);
    console.log($(this).parent('div').attr('id')); //the hour's savebtn
    //console.log($(this).prev()); //also selects the textarea

    //console.log($(this).parent('div').children('textarea').val());  //it's associated userText value
    localStorage.setItem(`schedule${$(this).parent('div').attr('id')}`, $(this).parent('div').children('textarea').val());

    var userSched = localStorage.getItem(`schedule${$(this).parent('div').attr('id')}`);
    //console.log(userSched);



    // $(this).prev().text(userSched);
    renderTxt();
    return userSched;

  })

  function renderTxt() {
    $(this).prev().text(userSched);
    console.log(this);
  }







  //kind of want to create an interval so it refreshes every 10minutes so even if im on the page but aren't actively on it, it still reloads
  //600000 milliseconds = 10min
  //  function newHr() {
  //   setInterval()
  //  }
  //console.log(timeBlock)
  //console.log(currentHr)
  //currentHr = 13;  //reset to test functionality
  //console.log(`test time set to: ${currentHr}`);
  //dring the hours of 9-5
  // if (currentHr > 8 && currentHr < 18) {  
  for (let i = 0; i < timeBlock.length; i++) {
    //console.log(timeBlock.eq(i).attr('id'))

    //when the currentHr matches the time-block hour, set class=.present
    if (currentHr == timeBlock.eq(i).attr('id')) {
      $(`#${timeBlock.eq(i).attr('id')}`).addClass('present');
      $(`#${timeBlock.eq(i).attr('id')}`).removeClass('past future');
    }
    //when the currentHr is greater than time-block hour, set class=.past
    else if (currentHr > timeBlock.eq(i).attr('id')) {
      $(`#${timeBlock.eq(i).attr('id')}`).addClass('past');
      $(`#${timeBlock.eq(i).attr('id')}`).removeClass('present future');
    }
    //when the currentHr is less than the time-blcok hour, set class=.future
    else if (currentHr < timeBlock.eq(i).attr('id')) {
      $(`#${timeBlock.eq(i).attr('id')}`).addClass('future');
      $(`#${timeBlock.eq(i).attr('id')}`).removeClass('past present');
    }
  }
  // } 

  //display date on page:
  liveDate.text(date);



});
