// Actual arithmetic functions

function addition(n1, n2) {
  return n1 + n2;
}

function substraction(n1, n2) {
  return n1 - n2;
}

function multiplication(n1, n2) {
  return n1 * n2;
}

function division(n1, n2) {
  return n1 / n2;
}

function operate(n1, n2, operation) {
  return operation(n1, n2);
}

// -------------------------------------------
let resultingValue = null;
let carryOver = null;
let previousResultingValue = null;
let currentOperator = "";
let operatorPressed = false;

const resultArea = document.querySelector(".result");
const numberZeroButton = document.querySelector(".num-zero");

const numberButtons = document.querySelector(".nums").children;
for (let btn of numberButtons) {
  btn.addEventListener("click", (e) => {
    if (!operatorPressed) {
      resultArea.textContent += e.target.dataset.value;
    } else {
      resultArea.textContent = e.target.dataset.value;
      operatorPressed = false;
    }
  });
}

numberZeroButton.addEventListener("click", (e) => {
  resultArea.textContent += e.target.dataset.value;
});

const operatorButtons = document.querySelector(".operators").children;
for (let btn of operatorButtons) {
  btn.addEventListener("click", (e) => {
    if (carryOver) {
      switch (currentOperator) {
        case "addition":
          resultingValue = operate(
            carryOver,
            Number(resultArea.textContent),
            addition
          );
          break;

          case "substraction":
          resultingValue = operate(
            carryOver,
            Number(resultArea.textContent),
            substraction
          );
          break;

          case "multiplication":
          resultingValue = operate(
            carryOver,
            Number(resultArea.textContent),
            multiplication
          );
          break;

          case "division":
          resultingValue = operate(
            carryOver,
            Number(resultArea.textContent),
            division
          );
          break;
      }
    }
    if (resultingValue) {
      resultArea.textContent = resultingValue;
    }
    carryOver = Number(resultArea.textContent);
    currentOperator = e.target.dataset.value;
    operatorPressed = true;
  });
}
