// This is a version of the calendar creator which does not use the holidays npm since 
// it does not require it. 

// Get the element
var element = document.getElementById("my-calendar");
// Create the calendar
var currentDateElement = new Date();
// Get the current year only
var currentYear = currentDateElement.getFullYear();
// Get the current day only
var dd = currentDateElement.getDate();
// Get the current month only
var mm = currentDateElement.getMonth() + 1;
// Get the current year only (Don't know why there's two..)
var yy = currentDateElement.getFullYear();
// Convert the currentDateString for output
var currentDateString = dd.toString() + "/" + mm + "/" + yy.toString();

// Initializes the calendar itself and provides some parameters for the design and functionality
var myCalendar = jsCalendar.new(element, currentDateString, {
    navigator: true,
    navigatorPosition: "center",
    zeroFill: false,
    monthFormat: "month YYYY",
    dayFormat: "DDD",
    language: "en",
    firstDayOfTheWeek: 1
});

// Get the inputs
var inputA = document.getElementById("my-input-a");
var isSelected = false;

// Days to add changed from 10 to 28. Meaning the pointer will stop on the 29th day marking it the 
// day the 4473 expires.
var daysToAdd = 28;

// Add events
var today = new Date();
//var holidays = allFederalHolidaysForYear(myCalendar._date.getFullYear());

// Get the button
var button = document.getElementById("my-button");

// Add a button event
button.addEventListener("click", function () {
    myCalendar.set(currentDateString);
    // Reset
    myCalendar.reset();
    // Unselect
    myCalendar.clearselect();
}, false);

myCalendar.onMonthChange(function (event, date) {
    holidays = allFederalHolidaysForYear(myCalendar._date.getFullYear());
    console.log(date.getFullYear());
    var year = date.getFullYear();

    if (year !== currentYear) {
        currentYear = year;
    }
});

//Click function which calls the select function to calculate pick up date.
myCalendar.onDateClick(function (event, date) {
    myCalendar.clearselect();
    isSelected = false;
    myCalendar.set(date);
    myCalendar.select(addDates(date, daysToAdd));
    isSelected = true;
    var selected = myCalendar.getSelected({ sort: "desc", type: "MM-DD-YYYY" }).toString()
    inputA.value = selected;

    if (!myCalendar.isVisible()) {
        myCalendar.goto(date);
    }
});

// Function to calculate 10 business days and pick up on 11th. Will skip holidays.
function addDates(startDate, noOfDaysToAdd) {
    var count = 0;
    while (count < noOfDaysToAdd) {
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));

        // Skip sundays and current holidays
        if (true) {
            count++;
        }
    }

    // Allows pick up date to include Saturdays
    if (endDate.getDate() != 0) {
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));
    }

    return startDate;
}
