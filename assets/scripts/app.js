const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 16;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const enteredValue = prompt('Maximum life for you and for monster', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) 
    chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('It was close! Say thanks to your bonus life!')
    } else if (currentPlayerHealth <= 0) {
        alert('You lost!');
        reset(chosenMaxLife);
    }
}

function attackMonster(attackType) {
    let maxDamange;
    if (attackType === 'ATTACK') {
        maxDamange = ATTACK_VALUE;
    } else if (attackType === 'STRONG_ATTACK') {
        maxDamange = STRONG_ATTACK_VALUE;
    }

    const monsterDamage = dealMonsterDamage(maxDamange);
    currentMonsterHealth -= monsterDamage;
    if (currentMonsterHealth <= 0) {
        alert('You won!');
        reset(chosenMaxLife);
    }

    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function healHandler() {
    let healValue = HEAL_VALUE;

    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        healValue = chosenMaxLife - currentPlayerHealth
        alert('Your health is full!');
    }

    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);