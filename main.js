const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form-input");
const dayInput = document.querySelector(".day-input");
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");
const label = document.querySelectorAll(".label");
const day = document.querySelector(".day-msg");
const month = document.querySelector(".month-msg");
const year = document.querySelector(".year-msg");
const msg = document.querySelectorAll(".errorMsg");

let numYear = document.querySelector(".years");
let numMonth = document.querySelector(".month");
let numDay = document.querySelector(".days");

function error(elem, message) {
  for (i = 0; i < inputs.length; i++) {
    inputs[i].style.borderColor = "hsl(0, 100%, 67%)";
    label[i].style.color = "hsl(0, 100%, 67%)";
    inputs[i].style.color = "hsl(0, 100%, 67%);";
  }
  elem.innerText = message;
}
const now = new Date();
function errorCheck() {
  const maxDays = new Date(yearInput.value, monthInput.value, 0).getDate();
  let noError = true;
  function validateError(errorInput, errorElement, errorMessage) {
    if (errorInput.value === "" || errorInput.value == null) {
      error(errorElement, "This field is required");
    } else if (
      !(errorInput.value >= 1) &&
      !(errorInput === yearInput
        ? errorInput.value <= now.getFullYear()
        : errorInput === monthInput
        ? errorInput.value <= 12
        : errorInput.value <= maxDays)
    ) {
      error(errorElement, errorMessage);
      noError = false;
    }
  }
  validateError(dayInput, day, "Must be a valid date");
  validateError(monthInput, month, "Must be a valid month");
  validateError(yearInput, year, "Must be in the past");
  return noError;
}

for (i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("click", () => {
    for (j = 0; j < inputs.length; j++) {
      inputs[j].style.borderColor = "hsl(0, 0%, 94%)";
      label[j].style.color = "grey";
      msg[j].innerText = "";
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let resultDay = 0;
  let resultMonth = 0;
  let resultYear = 0;
  function calculate(today, date, result, change = 0) {
    const maxDays = new Date(yearInput.value, monthInput.value, 0).getDate();
    result += today - date.value;
    if (result < 0) {
      if (date === dayInput) {
        result += maxDays;
      } else {
        result += 12;
      }
      change--;
    }
    console.log(result + "This is first result");
    return { result, change };
  }
  let finalDay = 0;
  let finalMonth = 0;
  let finalYear = 0;

  if (errorCheck()) {
    const dayResult = calculate(
      now.getDate(),
      dayInput,
      resultDay,
      resultMonth
    );

    finalDay = dayResult.result;
    resultMonth = dayResult.change;
    const monthResult = calculate(
      now.getMonth() + 1,
      monthInput,
      resultMonth,
      resultYear
    );
    finalMonth = monthResult.result;
    resultYear = monthResult.change;
    const yearResult = calculate(now.getFullYear(), yearInput, resultYear);
    finalYear = yearResult.result;

    //Number Counting
    function numUp(num, finalNum) {
      let interval = 1000;
      let start = -1;
      let end = finalNum;
      let duration = interval / end;
      let counter = setInterval(function () {
        start++;
        num.innerText = start;
        if (start === finalNum) {
          clearInterval(counter);
        }
      }, duration);
    }
    numUp(numDay, finalDay);
    numUp(numMonth, finalMonth);
    numUp(numYear, finalYear);
  }
  console.log(finalDay);
  console.log(finalMonth);
  console.log(finalYear);
});
