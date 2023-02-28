class Calculator {
  // Calculator 함수를 실행하면 constructor 함수 실행
  constructor(displayElement) {
    //displayElement와 displayContent 값 정리
    this.displayElement = displayElement
    this.displayContent =''
    // this.clear()
  }
  appendNumber(number) {
    this.displayContent += number
  }

  appendOperator(operator) {
    this.displayContent += operator
  }

  updateDisplay() {
    this.displayElement.value = this.displayContent
  }

  clear() {
    this.displayContent=''
    this.displayElement.value=0
  }

  compute() {
    this.displayContent = eval(this.displayContent
      .replace('\u00D7', '*')
      .replace('\u00f7', '/')
      )   
  }
}

const buttons = document.querySelectorAll('button')
const displayElement = document.querySelector('input')

const calculator = new Calculator(displayElement)

buttons.forEach(button=> {
  button.addEventListener('click', ()=> {
    switch(button.dataset.type) {
      case 'ac':
        calculator.clear()
        break
      case 'operator':
        calculator.appendOperator(button.innerText)
        calculator.updateDisplay()
        break
      case 'equals':
        calculator.compute()
        calculator.updateDisplay()
        break
      default:
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        break
    }
  })
})