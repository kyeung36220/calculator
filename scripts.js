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
    currentNumber = ""
    alteringNumber = ""
    blankSlate = true
    currentOperator = "nan"
    secondNumber = false
    changedToPercent = false
    changedToFloat = false
}

function numberClicked(e) {
    let number = e.target.value
    if (changedToPercent == true) {
        return
    }

    else if (afterEqual == true) {
        clearText()
        currentNumber += number
        screenText.textContent = currentNumber
        afterEqual = false
    }

    else if (blankSlate == true) {
        currentNumber += number
        screenText.textContent = currentNumber
    }

    else if (secondNumber == true) {
        blankSlate = false
        alteringNumber += number
        screenText.textContent = alteringNumber
    }

    else {
        alteringNumber += number
        screenText.textContent = alteringNumber
    }
}

function operatorClicked(e) {
    alteringNumber = ""
    currentOperator = e.target.value
    secondNumber = true
    changedToPercent = false
    changedToFloat = false
    afterEqual = false
    blankSlate = false
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
    secondNumber = false
    afterEqual = true
    changedToPercent = false
    changedToFloat = false
    blankSlate = false
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

const screenText = document.querySelector(".screen .text")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clear = document.querySelector(".clear")
const sign = document.querySelector(".sign")
const percent = document.querySelector(".percent")
const dot = document.querySelector(".dot")
const equalSign = document.querySelector(".equal")

let blankSlate = true
let currentNumber = ""
let alteringNumber = ""
let currentOperator = undefined
let secondNumber = false
let afterEqual = false
let changedToPercent = false
let changedToFloat = false

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
