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
let currentOperator = "";
let operatorPressed = false;
let equalsPressed = false;

const resultArea = document.querySelector(".result");
const numberZeroButton = document.querySelector(".num-zero");

const numberButtons = document.querySelector(".nums").children;
for (let btn of numberButtons) {
  btn.addEventListener("click", (e) => {
    if (operatorPressed || equalsPressed) {
      if (operatorPressed) operatorPressed = false;
      if (equalsPressed) {
        carryOver = null;
        resultingValue = null;
        equalsPressed = false;
      }
      resultArea.textContent = e.target.dataset.value;
    } else {
      resultArea.textContent += e.target.dataset.value;
    }
  });
}

numberZeroButton.addEventListener("click", (e) => {
  if (operatorPressed || equalsPressed) {
    if (operatorPressed) operatorPressed = false;
    if (equalsPressed) equalsPressed = false;
    resultArea.textContent = e.target.dataset.value;
  } else {
    resultArea.textContent += e.target.dataset.value;
  }
});

const operatorButtons = document.querySelector(".operators").children;
for (let btn of operatorButtons) {
  btn.addEventListener("click", (e) => {
    if (carryOver && !equalsPressed) {
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
    if (resultingValue && !equalsPressed) {
      if (resultingValue.toString().length > 15) {
        resultArea.textContent = resultingValue.toExponential(2);
      } else resultArea.textContent = resultingValue;
    }
    carryOver = Number(resultArea.textContent);
    currentOperator = e.target.dataset.value;
    operatorPressed = true;
    equalsPressed = false;
  });
}

const equalsButton = document.querySelector(".equals");
equalsButton.addEventListener("click", () => {
  if (equalsPressed) return;
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
  if (resultingValue.toString().length > 15) {
    resultArea.textContent = resultingValue.toExponential(2);
  } else resultArea.textContent = resultingValue;
  carryOver = resultingValue;
  operatorPressed = false;
  equalsPressed = true;
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  resultArea.textContent = "";
  resultingValue = null;
  carryOver = null;
  currentOperator = "";
  operatorPressed = false;
  equalsPressed = false;
});

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
  resultArea.textContent = resultArea.textContent.slice(0, -1);
});

// ------------------------------

// Animations
const allButtons = document.querySelectorAll(".btn");
allButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const button = e.target;
    if (
      button.parentElement.classList.contains("nums") ||
      button.classList.contains("num-zero")
    ) {
      button.classList.add("btn-clicked");
    } else if (button.parentElement.classList.contains("operators")) {
      button.classList.add("operator-clicked");
    } else {
      button.classList.add("operator-clicked");
    }
  });
});

allButtons.forEach((btn) => {
  btn.addEventListener("transitionend", () => {
    if (btn.classList.contains("btn-clicked")) {
      btn.classList.remove("btn-clicked");
    } else btn.classList.remove("operator-clicked");
  });
});
