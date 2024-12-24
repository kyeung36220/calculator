// Initialization of all buttons into variables
const screenText = document.querySelector(".screen .text")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clear = document.querySelector(".clear")
const sign = document.querySelector(".sign")
const percent = document.querySelector(".percent")
const dot = document.querySelector(".dot")
const equalSign = document.querySelector(".equal")

// Initialization of all necessary variables
let blankSlate = true
let currentNumber = ""
let alteringNumber = ""
let currentOperator = undefined
let secondNumber = false
let afterEqual = false
let changedToPercent = false
let changedToFloat = false

// Initialization of all button click's functions
numbers.forEach(number => {
    number.addEventListener("click", numberClicked)
})

operators.forEach(operator => {
    operator.addEventListener("click", operatorClicked)
})

equalSign.addEventListener("click", equal)
clear.addEventListener("click", clearText)
sign.addEventListener("click", signChange)
percent.addEventListener("click", changeToPercent)
dot.addEventListener("click", changeToFloat)

// Math functions
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

// When AC is pressed
function clearText() {
    screenText.textContent = ""
    currentNumber = ""
    alteringNumber = ""
    currentOperator = "nan"
    reset("clearText")
}

// When any digit is pressed
function numberClicked(e) {
    let number = e.target.value

    // prevents more numbers after percent sign
    if (changedToPercent == true) {
        return
    }

    // resets entire calc if number is pressed after equal sign
    else if (afterEqual == true) {
        clearText()
        currentNumber += number
        screenText.textContent = currentNumber
        afterEqual = false
    }

    // sees if number is the first number in a calculation
    else if (blankSlate == true) {
        currentNumber += number
        screenText.textContent = currentNumber
    }

    // sees if number is second number
    else if (secondNumber == true) {
        alteringNumber += number
        screenText.textContent = alteringNumber
    }

    // if first number
    else {
        alteringNumber += number
        screenText.textContent = alteringNumber
    }
}

function operatorClicked(e) {
    alteringNumber = ""
    currentOperator = e.target.value
    reset("operatorClicked")
}

function reset(functionName) {
    changedToPercent = false
    changedToFloat = false
    if (functionName === "clearText") {
        blankSlate = true
        afterEqual = false
        secondNumber = false
    }
    else if (functionName === "operatorClicked") {
        blankSlate = false
        afterEqual = false
        secondNumber = true
    }
    else if (functionName === "equal") {
        blankSlate = false
        afterEqual = true
        secondNumber = false
    }
}

function equal() {
    currentNumber = Number(currentNumber)
    alteringNumber = Number(alteringNumber)
    if (currentOperator == "add") {
        total = add()
    }
    else if (currentOperator == "subtract") {
        total = subtract()
    }
    else if (currentOperator == "multiply") {
        total = multiply()
    }
    else if (currentOperator == "divide") {
        if (alteringNumber == 0) {
            alert("Can't divide by 0")
            return
        }
        else {
            total = divide()
        }
    }
    else {
        total = currentNumber
    }

    total = Math.round(total * 10000000000) / 10000000000

    screenText.textContent = total
    currentNumber = total
    reset("equal")
}

function signChange() {
    if (secondNumber == false) {
        currentNumber *= -1
        screenText.textContent = currentNumber
    }
    else {
        alteringNumber *= -1
        screenText.textContent = alteringNumber
    }
}

function changeToPercent() {
    if (changedToPercent == true) {
        return
    }
    else if (secondNumber == false) {
        currentNumber /= 10
        screenText.textContent = screenText.textContent + `%`
    }
    else {
        alteringNumber /= 10
        screenText.textContent = screenText.textContent + `%`
    }
    changedToPercent = true
}

function changeToFloat() {
    if (changedToFloat == true) {
        return
    }
    else {
        if (secondNumber == false) {
            currentNumber += "."
            screenText.textContent = currentNumber
        }
        else {
            alteringNumber += "."
            screenText.textContent = alteringNumber
        }
    }
    changedToFloat = true
}
