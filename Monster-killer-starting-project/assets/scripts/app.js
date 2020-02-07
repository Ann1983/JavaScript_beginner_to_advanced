const ATTACK_VALUE = 10;
const ATTACK_VALUE_PLAYER = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const ATTACK = 'ATTACK';
const STRONG_ATTACK = 'STRONG_ATTACK';

const enteredMaxlife = prompt('Enter maximum life for your monster', '100');
let chosenMaxLife = parseInt(enteredMaxlife);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonusLife = true;


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

  if (currentPlayerHealth <= 0 && bonusLife) {
    bonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('Бонусная жизнь Вас спасла!');
  }



  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('Вы выиграли!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('Вы проиграли!');
  } else if (currentPlayerHealth < 0 && currentMonsterHealth < 0) {
    alert('Ничья!');
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }

}

function attackHandler(mode) {
  let maxDamage;
  if (mode === ATTACK) {
    maxDamage = ATTACK_VALUE;
  } else if (mode === STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
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
  endRound();
}

attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', healPlayer);

