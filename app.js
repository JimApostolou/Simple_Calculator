class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.operation = undefined;
        this.currentOperand = '';
    } 

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    getDisplay(number) {
        const stringNumber = number.toString();
        const intNumber = parseFloat(stringNumber.split('.')[0]);
        const decNumber = stringNumber.split('.')[1];
        let intDisplay;
        if (isNaN(intNumber)) {
            intDisplay = '';
        } else {
            intDisplay = intNumber.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decNumber != null) {
            return `${intDisplay}.${decNumber}`;
        } else {
            return intDisplay;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '/':
                if (curr !== 0) {
                    computation = prev / curr;
                } else {
                    computation = 'Not valid!';
                }
                break;
            case '*':
                computation = prev * curr;
                break;
            default:
                break;
            
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//instance of calculator
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clearAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})