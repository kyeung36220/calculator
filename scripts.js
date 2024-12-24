function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function clearText() {
    screenText.textContent = ""
}

function numberClicked(e) {
    screenText.textContent = `${e.target.value}`
    alteringNumber = e.target.value
}

const screenText = document.querySelector(".screen .text")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const clear = document.querySelector(".clear")
const sign = document.querySelector(".sign")
const percent = document.querySelector(".percent")
const dot = document.querySelector(".dot")
const equal = document.querySelector(".equal")
let currentNumber = 0
let alteringNumber = 0

numbers.forEach(number => {
    number.addEventListener("click", numberClicked)
})
