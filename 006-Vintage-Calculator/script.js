let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const signToggleButton = document.querySelector("button[onclick='+/-']");

display.innerText = "0";

function clearDisplay() {
    display.innerText = "0";
}

function resetCalculator() {
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    clearDisplay();
}

function updateDisplay(value) {
    if (display.innerText === "0" || shouldResetDisplay) {
        display.innerText = value;
        shouldResetDisplay = false;
    } else {
        display.innerText += value;
    }
}

function toggleSign() {
    const currentValue = display.innerText;
    if (currentValue !== "0") {
        if (currentValue.startsWith("-")) {
            display.innerText = currentValue.substring(1);
        } else {
            display.innerText = "-" + currentValue;
        }
    }
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => y === 0 ? "Error" : x / y;
const remainder = (x, y) => y === 0 ? "Error" : x % y;

function operate(x, y, operator) {
    x = parseFloat(x);
    y = parseFloat(y);
    
    switch(operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
        case "%":
            return remainder(x, y);
        default:
            return "Error";
    }
}

function formatResult(result) {
    if (result === "Error") return "Error";
    
    const resultStr = result.toString();
    
    if (resultStr.length > 12) {
        if (Math.abs(result) < 1e9) {
            const decimalPlaces = Math.max(0, 11 - Math.floor(result).toString().length);
            return parseFloat(result.toFixed(decimalPlaces));
        } 
        return parseFloat(result.toExponential(8));
    }
    
    return result;
}


numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        updateDisplay(button.innerText);
    });
});

decimalButton.addEventListener("click", () => {
    if (!display.innerText.includes(".")) {
        updateDisplay(".");
    }
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.id === "equals") return;
        
        if (firstOperand === null) {
            firstOperand = display.innerText;
        } else if (currentOperator) {
            secondOperand = display.innerText;
            const result = operate(firstOperand, secondOperand, currentOperator);
            display.innerText = formatResult(result);
            firstOperand = display.innerText;
            secondOperand = null;
        }
        currentOperator = button.innerText;
        shouldResetDisplay = true;
    });
});

equalsButton.addEventListener("click", () => {
    if (firstOperand !== null && currentOperator) {
        secondOperand = display.innerText;
        const result = operate(firstOperand, secondOperand, currentOperator);
        display.innerText = formatResult(result);
        firstOperand = display.innerText;
        currentOperator = null;
        shouldResetDisplay = true;
    }
});

clearButton.onclick = resetCalculator;

document.querySelector("button:nth-of-type(2)").addEventListener("click", toggleSign);