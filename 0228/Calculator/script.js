class Calculator {
  // Calculator 함수를 실행하면 constructor 함수 실행, 생성자 같은 역할을 수행함
  constructor(displayElement) {
    //displayElement와 displayContent 값 정리
    this.displayElement = displayElement
    this.displayContent =''
    //시작할 때 바로 clear()를 탐. 처음화면에 displayElement.value=0으로 해놔서 0이 뜸, 나중에 AD에서 호출해서도 씀
    this.clear()
  }
  //숫자 버튼을 눌렀을 때 그 숫자를 displayContent에 담기(append: 붙인다는 뜻), 문자끼리 이어붙여짐
  appendNumber(number) {
    this.displayContent += number
  }
  //연산자 버튼을 눌렀을 때 그 연산자를 displayContent에 담기
  appendOperator(operator) {
    this.displayContent += operator
  }
  //숫자 및 연산자를 화면(input)에 표시
  updateDisplay() {
    this.displayElement.value = this.displayContent
  }

  //AC를 눌렀을 때 초기화 함수
  clear() {
    this.displayContent=''
    this.displayElement.value=999
  }
  //연산 함수, eval은 문자열 내용을 계산한 값을 리턴.
  //그런데 나눗셈과 곱셈 기호는 우리가 보는 연산자와 다르므로 replace를 통해 치환
  compute() {
    this.displayContent = eval(this.displayContent
      .replace('\u00D7', '*')
      .replace('\u00f7', '/')
      )   
  }
}

//버튼과 인풋에 있는 내용을 변수에 담아 활용할 것임
const buttons = document.querySelectorAll('button')
const displayElement = document.querySelector('input')

//calculator 객체 생성
const calculator = new Calculator(displayElement)


//button마다 이벤트리스너를 탐
//이벤트리스너는 클릭할 때마다(forEach) 함수를 실행함
buttons.forEach(button=> {
  //함수 바로 명시 ()=>{}
  button.addEventListener('click', ()=> {

    //button 데이터타입마다 스위치를 탐
    switch(button.dataset.type) {

      //ac면 초기화
      case 'ac':
        calculator.clear()
        break

      //연산자면 연산자 추가. button의 innerText를 displayElement에 추가
      case 'operator':
        calculator.appendOperator(button.innerText)
        calculator.updateDisplay()
        break

      //= 버튼을 누르면 compute()를 실행해 디스플레이에 보여줌
      case 'equals':
        calculator.compute()
        calculator.updateDisplay()
        break

      //나머지 버튼9숫자)들의 innerText를 displayElement에 추가
      default:
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        break
    }
  })
})