const ATTACK_VALUE = 10;
const ATTACK_VALUE_PLAYER = 14;
const STRONG_ATTACK_VALUE = 17;
let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackHandler(mode) {
  let maxDamage;

  if (mode === 'KILL') {
    maxDamage = 1000;
  }

  if (mode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamage = STRONG_ATTACK_VALUE;
  }

  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  const damagePlayer = dealPlayerDamage(ATTACK_VALUE_PLAYER);
  currentPlayerHealth -= damagePlayer;

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!');
  } else if (currentPlayerHealth < 0 && currentMonsterHealth < 0) {
    alert('You have a deal!');
  }
}

function onAttack() {
  attackHandler('ATTACK');
}

function onStrongAttack() {
  attackHandler('STRONG_ATTACK');
}

function killHim() {
  attackHandler('KILL');
}

attackBtn.addEventListener('click', onAttack);
strongAttackBtn.addEventListener('click', onStrongAttack);
healBtn.addEventListener('click', killHim);

