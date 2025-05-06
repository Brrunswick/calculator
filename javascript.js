//defining the 3 variables we will need to hold our user input data
let firstNum = undefined;
let secondNum = undefined;
let mathOperation = undefined;

//this is a temporary solution to stop allowing users to delete numbers from calculated answers
let justCalculated = false;

//defining variables for the HTML content we will want the user to interact with
const screenText = document.querySelector("#screenText");
let numButtons = document.querySelectorAll(".numButton");
let opButtons = document.querySelectorAll(".opButton");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const del = document.querySelector("#delete");
const plusMinus = document.querySelector("#plusminus");
const dec = document.querySelector("#decimal");
let buttons = document.querySelectorAll("button");

//creating a function that will store the users number input
function storeNum(event) {
    if (firstNum === undefined && mathOperation === undefined) {
        firstNum = `${event.target.value}`;
        screenText.textContent = `${event.target.value}`;
    } else if (secondNum === undefined && mathOperation === undefined) {
        firstNum += `${event.target.value}`;
        screenText.textContent += `${event.target.value}`;
    } else if (secondNum === undefined & mathOperation != undefined) {
        secondNum = `${event.target.value}`;
        screenText.textContent = `${event.target.value}`;
    } else if (secondNum != undefined && mathOperation != undefined) {
        secondNum += `${event.target.value}`;
        screenText.textContent += `${event.target.value}`;
    };
    justCalculated = false;
};

//creating a function that will run a calculation and give an answer as long as 2 numbers and an operator have been provided
function calculate() {
    if (firstNum != undefined && secondNum != undefined && mathOperation != undefined) {
        firstNum = parseFloat(firstNum);
        secondNum = parseFloat(secondNum);
        if (mathOperation === "x") {
            firstNum = multiply(firstNum, secondNum);
        } else if (mathOperation === "/") {
            firstNum = divide(firstNum, secondNum);
        } else if (mathOperation === "+") {
            firstNum = add(firstNum, secondNum);
        } else if (mathOperation === "-") {
            firstNum = subtract(firstNum, secondNum);
        }
        secondNum = undefined;
        justCalculated = true;
        if (Number.isInteger(firstNum)) {
            screenText.textContent = firstNum;
        } else {
            screenText.textContent = +(Math.round(firstNum * 100) / 100).toFixed(2);
        };
    };
};

//creating a function that will store an operator AND run a calculation if 2 numbers and an operator have already been provided
function storeOperator(event) {
    if (firstNum != undefined && secondNum !=undefined && mathOperation !=undefined) {
        calculate();
        if (Number.isInteger(firstNum)) {
            screenText.textContent = firstNum;
        } else {
            screenText.textContent = +(Math.round(firstNum * 100) / 100).toFixed(2);
        }
        mathOperation = event.target.value;
    } else if (firstNum != undefined) {
        mathOperation = event.target.value;
    };
};

//defined a function that would allow users to turn positive numbers into negative numbers and vice versa
function positiveNegative() {
    if (firstNum != undefined && firstNum > 0 && secondNum === undefined) {
        firstNum = Math.abs(firstNum) * -1;
        firstNum = +(Math.round(firstNum * 100) / 100).toFixed(2);
        screenText.textContent = firstNum;
    } else if (firstNum != undefined && firstNum < 0 && secondNum === undefined) {
        firstNum = Math.abs(firstNum);
        firstNum = +(Math.round(firstNum * 100) / 100).toFixed(2);
        screenText.textContent = firstNum;
    } else if (secondNum != undefined && secondNum > 0) {
        secondNum = Math.abs(secondNum) * -1;
        secondNum = +(Math.round(secondNum * 100) / 100).toFixed(2);
        screenText.textContent = secondNum;
    } else if (secondNum != undefined && secondNum < 0) {
        secondNum = Math.abs(secondNum);
        secondNum = +(Math.round(secondNum * 100) / 100).toFixed(2);
        screenText.textContent = secondNum;
    }
}

//defined a function to allow the user to add a decimal place to create non integer numbers - could be cleaned up as the list of checks within each if statement is quite long
function decimal() {
    if (firstNum != undefined && secondNum === undefined && Number.isInteger(parseFloat(firstNum)) && firstNum.toString().charAt(firstNum.length-1) != "." && justCalculated === false) {
        firstNum = firstNum.toString()+".";
        screenText.textContent = firstNum;
    } else if (secondNum != undefined && Number.isInteger(parseFloat(secondNum)) && secondNum.toString().charAt(secondNum.length-1) != "." && justCalculated === false) {
        secondNum = secondNum.toString()+".";
        screenText.textContent = secondNum;
    };
};

//creating a function that will allow the user to delete their last numerical input
function deleteNum() {
    if (firstNum != undefined && secondNum === undefined && firstNum.toString().length === 1 && justCalculated === false) {
        firstNum = undefined;
        screenText.textContent = "0";
    } else if (firstNum != undefined && secondNum === undefined && justCalculated === false) {
        firstNum = firstNum.toString().slice(0, -1);
        screenText.textContent = firstNum;
        firstNum = parseFloat(firstNum);
    } else if (secondNum != undefined && secondNum.toString().length === 1 && justCalculated === false) {
        secondNum = undefined;
        screenText.textContent = firstNum;
    } else if (secondNum != undefined && justCalculated === false) {
        secondNum = secondNum.toString().slice(0, -1);
        screenText.textContent = secondNum;
        secondNum = parseFloat(secondNum);
    };
};

//creating a function that will clear all numbers and operators
function clearAll() {
    firstNum = undefined;
    secondNum = undefined;
    mathOperation = undefined;
    screenText.textContent = "0";
    justCalculated = false;
};


//defining a function to add 2 numbers
const add = function(a, b) {
	let answer = a + b;
    return parseFloat(answer);
};

//defining a function to subtract 2 numbers
const subtract = function(a, b) {
    let answer = a - b;
    return parseFloat(answer);
};

//defining a function to multiply 2 numbers
const multiply = function(a, b) {
    let answer = a * b;
    return parseFloat(answer);
  };

//defining a function to divide one number by another
const divide = function(a, b) {
    let answer = a / b;
    return parseFloat(answer);
};

//defining a function that plays a button click sound when called
function clickSound() {
    const audio = new Audio("button.mp3");
    audio.play();
}

//giving "click" event listeners to each number button to allow users to input numbers
numButtons.forEach(function(numButton) {
    numButton.addEventListener("click", storeNum);
});

//giving "click" event listeners to each operator button to allow users to input operators AND run calculations if all 3 parameters (firstNum, secondNum & operator) have been met
opButtons.forEach(function(opButton) {
    opButton.addEventListener("click", storeOperator);
});

//giving a "click" event to the equals button to allow the user to calculate answers
equals.addEventListener("click", calculate);

//giving a "click" event listener to the AC button allowing the user to clear all values for numbers & operators
clear.addEventListener("click", clearAll);

//giving a "click" event listener to the C button allowing the user to delete their last numerical input
del.addEventListener("click", deleteNum);

//giving a "click" event listener to allow users to turn positive numbers into negative numbers and vice versa
plusMinus.addEventListener("click", positiveNegative);

//giving a "click" event listener to allow users to create decimals
dec.addEventListener("click", decimal)

//giving a "click" event listener to every button to give each button a click sound when pressed
buttons.forEach(function(button) {
    button.addEventListener("click", clickSound);
});
