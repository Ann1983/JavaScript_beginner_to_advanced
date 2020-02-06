const defaultResult = 0;

let currentResult = defaultResult;

let logEntries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };

  logEntries.push(logEntry);
  console.log(logEntries);
}


//  if (calculateType === 'ADD' ||
//   calculateType === 'SUBSTRACT' ||
//   calculateType === 'MULTIPLY' ||
//   calculateType === 'DIVIDE') {

function calculateResult(calculateType) {
  const enteredNumber = getUserNumberInput();
  if (calculateType !== 'ADD' &&
    calculateType !== 'SUBSTRACT' &&
    calculateType !== 'MULTIPLY' &&
    calculateType !== 'DIVIDE' ||
    !enteredNumber) {
    return;
  }

  const initialResult = currentResult;
  let mathOperator;
  if (calculateType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculateType === 'SUBSTRACT') {
    currentResult -= enteredNumber;
    mathOperator = "-";
  } else if (calculateType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else {
    currentResult /= enteredNumber;
    mathOperator = '/';
  }

  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculateType, initialResult, enteredNumber, currentResult);
}
// }

function add() {
  calculateResult('ADD');
}

function substract() {
  calculateResult('SUBSTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
}

function divide() {
  calculateResult('DIVIDE');
}

addBtn.addEventListener('click', add);

subtractBtn.addEventListener('click', substract);

multiplyBtn.addEventListener('click', multiply);

divideBtn.addEventListener('click', divide);

console.log(greeting()('GlobalLogic'));





