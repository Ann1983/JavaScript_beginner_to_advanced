const ATTACK_VALUE = 30;
const ATTACK_VALUE_PLAYER = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const ATTACK = 'ATTACK';
const STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATACK = 'LOG_EVENT_PLAYER_ATACK';
const LOG_EVENT_STRONG_PLAYER_ATACK = 'LOG_EVENT_STRONG_PLAYER_ATACK';
const LOG_EVENT_PLAYER_HEAL = 'LOG_EVENT_PLAYER_HEAL';
const LOG_EVENT_MONSTER_ATACK = 'lOG_EVENT_MONSTER_ATACK';
const LOG_EVENT_GAME_OVER = 'LOG_EVENT_GAME_OVER';




function getMaxLife() {
  const enteredMaxlife = prompt('Enter maximum life for your monster', '100');
  const parsedValue = parseInt(enteredMaxlife);
  if (isNaN(parsedValue) || parsedValue <= 0) {
    throw { message: 'Invalid user unput, not a number' };
  }
  return parsedValue;
}

let chosenMaxLife = getMaxLife();

let battleLog = [];
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonusLife = true;
let lastLogEvent;

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: currentMonsterHealth,
    finalPlayerHealth: currentPlayerHealth
  };
  switch (event) {
    case LOG_EVENT_PLAYER_ATACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_STRONG_PLAYER_ATACK:
      logEntry = {
        event: event,
        value: value,
        target: 'MONSTER',
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: currentPlayerHealth
      };
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: currentPlayerHealth
      };
      break;
    case LOG_EVENT_MONSTER_ATACK:
      logEntry = {
        event: event,
        value: value,
        target: 'PLAYER',
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: currentPlayerHealth
      };
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: currentPlayerHealth
      }
      break;
    default:
      logEntry = {};
  }
  // if (event === LOG_EVENT_PLAYER_ATACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (event === LOG_EVENT_STRONG_PLAYER_ATACK) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: 'MONSTER',
  //     finalMonsterHealth: currentMonsterHealth,
  //     finalPlayerHealth: currentPlayerHealth
  //   }
  // } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: 'PLAYER',
  //     finalMonsterHealth: currentMonsterHealth,
  //     finalPlayerHealth: currentPlayerHealth
  //   }
  // } else if (event === LOG_EVENT_MONSTER_ATACK) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     target: 'PLAYER',
  //     finalMonsterHealth: currentMonsterHealth,
  //     finalPlayerHealth: currentPlayerHealth
  //   }
  // } else if (event === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: event,
  //     value: value,
  //     finalMonsterHealth: currentMonsterHealth,
  //     finalPlayerHealth: currentPlayerHealth
  //   }
  // }
  battleLog.push(logEntry);
}





adjustHealthBars(chosenMaxLife);


function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  let initialPlayerHealth = currentPlayerHealth;

  const damagePlayer = dealPlayerDamage(STRONG_ATTACK_VALUE);
  currentPlayerHealth -= damagePlayer;
  writeToLog(LOG_EVENT_MONSTER_ATACK,
    damagePlayer,
    currentMonsterHealth,
    currentPlayerHealth);
  if (currentPlayerHealth <= 0 && bonusLife) {
    bonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('Бонусная жизнь Вас спасла!');
  }



  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('Вы выиграли!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonsterHealth,
      currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Вы проиграли!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonsterHealth,
      currentPlayerHealth);
  } else if (currentPlayerHealth < 0 && currentMonsterHealth < 0) {
    alert('Ничья!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DROW',
      currentMonsterHealth,
      currentPlayerHealth);
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }

}

function attackHandler(mode) {
  const maxDamage = mode === ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  const logEvent = mode === ATTACK ? LOG_EVENT_PLAYER_ATACK : LOG_EVENT_STRONG_PLAYER_ATACK;
  //if (mode === ATTACK) {
  //maxDamage = ATTACK_VALUE;
  //logEvent = LOG_EVENT_PLAYER_ATACK;
  // } else if (mode === STRONG_ATTACK) {
  //maxDamage = STRONG_ATTACK_VALUE;
  //logEvent = LOG_EVENT_STRONG_PLAYER_ATACK;

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth);
  endRound();
}

function onAttack() {
  attackHandler(ATTACK);

}

function onStrongAttack() {
  attackHandler(STRONG_ATTACK);
}

function healPlayer() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't hit to more then your max initial life!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth);
  endRound();
}

function printLogHandler() {
  // j = 0;
  // do {
  //   console.log(j);
  //   j++;
  // } while (j < 3)
  i = 0;
  for (const ev of battleLog) {
    if (!lastLogEvent && lastLogEvent !== 0 || lastLogEvent < i) {
      console.log(`#${i}`);
      for (const key in ev) {
        console.log(`${key} => ${ev[key]}`);

      }
      lastLogEvent = i;
      break;
    }


    i++;

  }
  console.log(battleLog);
}
attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', healPlayer);
logBtn.addEventListener('click', printLogHandler);

