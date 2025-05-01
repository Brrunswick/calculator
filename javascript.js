let firstNum = undefined;
let secondNum = undefined;
let outputNum = undefined;
let mathOperation = undefined;

const screenText = document.querySelector("#screenText")
let numButtons = document.querySelectorAll(".numButton")
let opButtons = document.querySelectorAll(".opButton")
const equals = document.querySelector("#equals")
const clear = document.querySelector("#clear")

/* function displayNum(event) {
    if (parseInt(screenText.textContent) === 0) {
        screenText.textContent = `${event.target.value}`
    } else {
        screenText.textContent += `${event.target.value}`
    }
} */

function storeOperator(event) {
    mathOperation = event.target.value;
    console.log(mathOperation);
}

function storeNum(event) {
    if (firstNum === undefined && mathOperation === undefined && outputNum === undefined) {
        firstNum = `${event.target.value}`;
        screenText.textContent = `${event.target.value}`;
    } else if (mathOperation === undefined && outputNum === undefined){
        firstNum += `${event.target.value}`;
        screenText.textContent += `${event.target.value}`;
    } else if (secondNum === undefined) {
        secondNum = `${event.target.value}`;
        screenText.textContent = `${event.target.value}`;
    } else {
        secondNum += `${event.target.value}`;
        screenText.textContent += `${event.target.value}`;
    }
}

function calculate() {
    if (firstNum != undefined && secondNum != undefined && mathOperation === "x" && outputNum === undefined) {
        outputNum = multiply(firstNum, secondNum);
        screenText.textContent = `${+outputNum.toFixed(3)}`;
    } else if (firstNum != undefined && secondNum != undefined && mathOperation === "/" && outputNum === undefined){
        outputNum = divide(firstNum, secondNum);
        screenText.textContent = `${+outputNum.toFixed(3)}`;
    } else if (firstNum != undefined && secondNum != undefined && mathOperation === "-" && outputNum === undefined){
        outputNum = subtract(firstNum, secondNum);
        screenText.textContent = `${+outputNum.toFixed(3)}`;
    } else if (firstNum != undefined && secondNum != undefined && mathOperation === "+" && outputNum === undefined){
        outputNum = add(firstNum, secondNum);
        screenText.textContent = `${+outputNum.toFixed(3)}`;
    }
    mathOperation = undefined;
}

function clearAll() {
    firstNum = undefined;
    secondNum = undefined;
    outputNum = undefined;
    mathOperation = undefined;
    screenText.textContent = "0";
}

const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};


const multiply = function(a, b) {
    return a * b;
  };


const divide = function(a, b) {
    return a / b;
}


numButtons.forEach(function(numButton) {
    numButton.addEventListener("click", storeNum);
});

opButtons.forEach(function(opButton) {
    opButton.addEventListener("click", storeOperator);
});

equals.addEventListener("click", calculate);

clear.addEventListener("click", clearAll);