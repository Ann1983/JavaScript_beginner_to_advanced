const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const WRONG_CHOICE = ROCK;
const RESULT_DRAW = 'DRAW';
const RESULT_COMPUTER_WON = 'COMPUTER_WINS';
const RESULT_PLAYER_WON = 'PLAYER_WINS';

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(`Your choice: ${ROCK}, ${PAPER} OR ${SCISSORS} ? `, '');
  selection ? selection.toUpperCase() : alert('Please type any value.');
  if (selection !== ROCK &&
    selection !== PAPER &&
    selection !== SCISSORS) {
    alert(`Invalid choice! Your choise is ${WRONG_CHOICE}.`);
    return;
  }
  return selection;
}

const getComputerChoice = () => {
  const getChoice = Math.random();
  if (getChoice < 0.37) {
    return ROCK;
  } else if (getChoice < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
}

const getWinner = (cChoice, pChoice = WRONG_CHOICE) => {
  return cChoice === pChoice ? RESULT_DRAW :
    cChoice === SCISSORS && pChoice === ROCK ||
      cChoice === PAPER && pChoice === SCISSORS ||
      cChoice === ROCK && pChoice === PAPER ? RESULT_PLAYER_WON : RESULT_COMPUTER_WON;
}


startGameBtn.addEventListener('click', () => {
  debugger;
  if (gameIsRunning) {

    return;
  }

  gameIsRunning = true;
  console.log('Game is starting...');
  const playerSelection = getPlayerChoice();
  const computerSelection = getComputerChoice();
  let winner;
  if (playerSelection) {
    winner = getWinner(computerSelection, playerSelection)

  } else winner = getWinner(computerSelection);

  console.log(winner);
  let message = `You kicked ${playerSelection || WRONG_CHOICE} , computer kicked ${computerSelection}, you `;
  if (winner === RESULT_DRAW) {
    message = message + 'had a draw.'
  } else if (winner === RESULT_PLAYER_WON) {
    message = message + 'won.'
  } else message = message + 'lost.';
  alert(message);
  gameIsRunning = false;
});


const sumNumb = (resultHandler, ...dates) => {
  let sum = 0;
  for (const num of dates) {
    sum += num;
  }
  return resultHandler(sum);
}

const substractNumb = function () {
  let sum = 0;
  for (const num of arguments) {
    sum -= num;
  }
  return sum;
}

function displayVisible(result) {
  alert('Result of your expression' + result);
}
console.log(sumNumb(4, 3, 6, 11, 3));
console.log(substractNumb(7, 5, 7, 44, 5));

