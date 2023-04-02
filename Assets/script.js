// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {

  var today = dayjs();
  var date = today.format('dddd, MMM D, YYYY');
  var liveDate = $('#liveDate');
  var currentHr = dayjs().hour();
  var timeBlock = $('.time-block');
  var saveBtn = $('.saveBtn');  //will return an object
  var clearBtn = $('#clear');

  saveBtn.click(function () {
    console.log(this);
    var timeSlot = $(this).parent().attr('id');
    var notes = $(this).siblings('.description').val();   //grabs user notes
    console.log(timeSlot);
    console.log(notes);

    //set localStorage 
    localStorage.setItem(timeSlot, notes);
  })

  //(ancestor descendant)-selector  //items stored in localStorage are accessible ANYWHERE!
  //display localStorage items in their associated sections
  for (let i = 0; i < timeBlock.length; i++) {
    $(`#${timeBlock.eq(i).attr('id')} .description`).val(localStorage.getItem(`${timeBlock.eq(i).attr('id')}`));
  }

  //when clicked clear localStorage, and empties all the textareas
  clearBtn.click(function () {
    localStorage.clear();
    for (let i = 0; i < timeBlock.length; i++) {
      $(`#${timeBlock.eq(i).attr('id')} .description`).val('');
    }
  })

  //console.log(timeBlock)
  //console.log(currentHr)
  //currentHr = 13;  //reset to test functionality
  //console.log(`test time set to: ${currentHr}`);

  //during the hours of 9-5
  // if (currentHr > 8 && currentHr < 18) {  
  for (let i = 0; i < timeBlock.length; i++) {
    //console.log(timeBlock.eq(i).attr('id'))

    //if the currentHr matches the time-block hour, set class=present
    if (currentHr == timeBlock.eq(i).attr('id')) {
      $(`#${timeBlock.eq(i).attr('id')}`).addClass('present');
      $(`#${timeBlock.eq(i).attr('id')}`).removeClass('past future');
    }
    //if the currentHr is greater than time-block hour, set class=past
    else if (currentHr > timeBlock.eq(i).attr('id')) {
      $(`#${timeBlock.eq(i).attr('id')}`).addClass('past');
      $(`#${timeBlock.eq(i).attr('id')}`).removeClass('present future');
    }
    //if the currentHr is less than the time-blcok hour, set class=future
    else if (currentHr < timeBlock.eq(i).attr('id')) {
      $(`#${timeBlock.eq(i).attr('id')}`).addClass('future');
      $(`#${timeBlock.eq(i).attr('id')}`).removeClass('past present');
    }
  }
  // } 

  //display date on page:
  liveDate.text(date);

});


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

  //reference: askBSC Drew
  //  // //(ancestor descendant)-selector
  // $('#9 .description').val(localStorage.getItem('9'));
  // $('#10 .description').val(localStorage.getItem('10'));
  // $('#11 .description').val(localStorage.getItem('11'));
  // $('#12 .description').val(localStorage.getItem('12'));
  // $('#13 .description').val(localStorage.getItem('13'));
  // $('#14 .description').val(localStorage.getItem('14'));
  // $('#15 .description').val(localStorage.getItem('15'));
  // $('#16 .description').val(localStorage.getItem('16'));
  // $('#17 .description').val(localStorage.getItem('17'));
  // $('#18 .description').val(localStorage.getItem('18'));
  // //items stored in localStorage are accessible ANYWHERE!