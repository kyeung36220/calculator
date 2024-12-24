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
let firstNumber = ""
let secondNumber = ""
let currentOperator = undefined
let secondNumberFocused = false
let afterEqual = false
let changedToPercent = false
let changedToFloat = false
let operationUsed = false
const screenMaxLength = 12

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
    return firstNumber + secondNumber
}

function subtract() {
    return firstNumber - secondNumber
}

function multiply() {
    return firstNumber * secondNumber
}

function divide() {
    return firstNumber / secondNumber
}

// When AC is pressed
function clearText() {
    screenText.textContent = ""
    firstNumber = ""
    secondNumber = ""
    currentOperator = "nan"
    reset("clearText")
}

//prevents digits to overflow screen
function overflowedLength(firstLength, secondLength) {
    if (secondNumberFocused == false && firstLength >= screenMaxLength || secondNumberFocused == true && secondLength >= screenMaxLength) {
        alert("Character Limit Reached")
        return true
    }
    return false
}

function fitToScreen(number) {
    if (number.toString().length > 12) {
        return `Infinity` //temporary solution until I know how to round e notation numbers
    }
    else {
        return Math.round(number * 10000000000) / 10000000000
    }
}

// When any digit is pressed
function numberClicked(e) {
    let number = e.target.value

    //prevents user to input more than a number with 12 digits
    if (overflowedLength(firstNumber.toString().length, secondNumber.toString().length)) {
        return
    }

    // prevents more numbers after percent sign
    else if (changedToPercent == true) {
        return
    }

    // resets entire calc if number is pressed after equal sign
    else if (afterEqual == true) {
        clearText()
        firstNumber += number
        screenText.textContent = firstNumber
        afterEqual = false
    }

    // sees if number is the first number in a calculation
    else if (blankSlate == true) {
        firstNumber += number
        screenText.textContent = firstNumber
    }

    // sees if number is second number
    else if (secondNumberFocused == true) {
        screenText.textContent = secondNumber == "-" ? secondNumber *= -1 : secondNumber += number
    }

    // if first number
    else {
        screenText.textContent = firstNumber == "-" ? firstNumber *= -1 : firstNumber += number
    }
}

function operatorClicked(e) {

    // if operation is already happening, will auto equal the current two numbers then accept more numbers
    if (operationUsed = true) {
        equal()
        operationUsed = false
    }
    secondNumber = ""
    currentOperator = e.target.value
    reset("operatorClicked")
}

// Organizes the messy variables into readable format
function reset(functionName) {
    changedToPercent = false
    changedToFloat = false
    if (functionName === "clearText") {
        blankSlate = true
        afterEqual = false
        secondNumberFocused = false
        operationUsed = false
    }
    else if (functionName === "operatorClicked") {
        blankSlate = false
        afterEqual = false
        secondNumberFocused = true
        operationUsed = true
    }
    else if (functionName === "equal") {
        blankSlate = false
        afterEqual = true
        secondNumberFocused = false
        operationUsed = false
    }
}

function equal() {
    firstNumber = Number(firstNumber)
    secondNumber = Number(secondNumber)
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
        if (secondNumber == 0) {
            alert("Can't divide by 0")
            return
        }
        else {
            total = divide()
        }
    }
    else {
        total = firstNumber
    }

    //rounds to 12 digits
    total = fitToScreen(total)

    screenText.textContent = total
    firstNumber = total
    reset("equal")
}

function signChange() {
    //prevents character overflow with percent sign AND negative sign (percent sign is 2 digits long and negative sign is 1 digit long, 2+1 = 3)
    // HOWEVER NOTE: that in calculation when pressing percentage sign the actual number becomes a float (ex. 9999 -> 999.9) so we subtract 1 from the char amount, 3-1 = 2
    if (changedToPercent == true && overflowedLength(firstNumber.toString().length + 2, secondNumber.toString().length + 2)) {
        return
    }

    //prevent character overflow if digits already reaching end of screen
    else if (overflowedLength(firstNumber.toString().length + 1, secondNumber.toString().length + 1)) {
        return
    }

    //multiplies number by -1 to toggle negative/positive
    else if (secondNumberFocused == false) {
    
        // prevents -0
        if (firstNumber == 0) {
            firstNumber = "-"
            screenText.textContent = `-`
            return
        }
        firstNumber *= -1
        // toggles negative sign on screen for positive and negative numbers
        screenText.textContent = firstNumber > 0 ? screenText.textContent.slice(1) : `-${screenText.textContent}`
    }
    else {
    
        //prevents -0
        if (secondNumber == 0) {
            secondNumber = "-"
            screenText.textContent = `-`
            return
        }
        secondNumber *= -1
        // toggles negative sign on screen for positive and negative numbers
        screenText.textContent = secondNumber > 0 ? screenText.textContent.slice(1) : `-${screenText.textContent}`
    }
}

function changeToPercent() {

    //prevents multiple percent signs
    if (changedToPercent == true) {
        return
    }

    //prevent character overflow with percentage sign (percent symbol is 2 characters big)
    else if (overflowedLength(firstNumber.toString().length + 2, secondNumber.toString().length + 2)){
        return
    }

    else if (secondNumberFocused == false) {
        firstNumber /= 10
        screenText.textContent = screenText.textContent + `%`
    }
    else {
        secondNumber /= 10
        screenText.textContent = screenText.textContent + `%`
    }
    changedToPercent = true
}

function changeToFloat() {
    
    //prevents multiple decimal points
    if (changedToFloat == true) {
        return
    }
    else {
        if (secondNumberFocused == false) {
            firstNumber += "."
            screenText.textContent = firstNumber
        }
        else {
            secondNumber += "."
            screenText.textContent = secondNumber
        }
    }
    changedToFloat = true
}
