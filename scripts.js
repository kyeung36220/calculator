function add() {
    return currentNumber + alteringNumber
}

function subtract() {
    return currentNumber - alteringNumber
}

function multiply() {
    return currentNumber * alteringNumber
}

function divide() {
    return currentNumber / alteringNumber
}

function clearText() {
    screenText.textContent = ""
}

function numberClicked(e) {
    let number = e.target.value
    screenText.textContent = number
    if (firstCalc == true) {
        currentNumber = number
    }
    else {
        alteringNumber = number
    }
}

function operatorClicked(e) {
    let operator = e.target.value
    if (operator == "add") {
        add()
    }
    else if (operator == "subtract") {
        subtract()
    }
    else if (operator == "multiply") {
        multiply()
    }
    else if (operator == "divide"){
        divide()
    }
}

const screenText = document.querySelector(".screen .text")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clear = document.querySelector(".clear")
const sign = document.querySelector(".sign")
const percent = document.querySelector(".percent")
const dot = document.querySelector(".dot")
const equal = document.querySelector(".equal")

let firstCalc = true
let currentNumber = 0
let alteringNumber = 0
let currentOperator = "nan"

numbers.forEach(number => {
    number.addEventListener("click", numberClicked)
})

operators.forEach(operator => {
    operator.addEventListener("click", operatorClicked)
})
