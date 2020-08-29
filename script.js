class Calculator {
        constructor(previousOperand, currentOperand) {
            this.previousOperandText = previousOperand;
            this.currentOperandText = currentOperand;  
            this.clear();
        }

        clear() {
            this.currentOperand = '';
            this.previousOperand = '';
            this.operation = undefined;
        }

        delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }

        appendNumber(number) {
            if (number === "." && this.currentOperand.includes('.')) return;
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }

        chooseOperation(operation) {
            if (this.currentOperand === '') return;
            if (this.previousOperand !== "") {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand =''
        }

        compute() {
            let result;
            const prev = parseFloat(this.previousOperand);
            const current = parseFloat(this.currentOperand);
            if (isNaN(prev) || isNaN(current)) return;
            switch (this.operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '×':
                    result = prev * current;
                    break;
                case '÷':
                    result = prev / current;
                    break;
            default:
                return;
            }
            this.currentOperand = result;
            this.operation = undefined;
            this.previousOperand ="";
        }
        formatNumber(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const deciDigits = stringNumber.split('.')[1];
            let integerDisplay;
            if (isNaN(integerDigits)) {
                integerDisplay = ""
            }
            else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0});
                }
            if (deciDigits != null) {
                return `${integerDisplay}.${deciDigits}`;
            }
            else {
                return integerDisplay;
            }
            }

            
 
        updateDisplay() {
            this.currentOperandText.innerText = this.formatNumber(this.currentOperand);
            if (this.operation != null) {
                this.previousOperandText.innerText = 
                    `${this.formatNumber(this.previousOperand)} ${this.operation}`;
            } 
        }
    }

    const numberButtons = document.querySelectorAll(".number");
    const operationButtons = document.querySelectorAll(".operator");
    const equalButton = document.querySelector(".equal");
    const ACButton = document.querySelector(".AC");
    const clearButton = document.querySelector(".C");
    const deciButton = document.querySelector(".dot");
    const previousOperandText = document.querySelector(".previous-operand");
    const currentOperandText = document.querySelector('.current-operand');

    const calculator = new Calculator(previousOperandText, currentOperandText);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerHTML);
            calculator.updateDisplay();
        });
    }); 

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerHTML);
            calculator.updateDisplay();
        });
    }); 

    ACButton.addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    } )
    clearButton.addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    } )

    equalButton.addEventListener('click', button => {
        calculator.compute();
        calculator.updateDisplay();
    })
