const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 16;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
    if (currentMonsterHealth <= 0)
        alert('You won!');

    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0)
        alert('You lost!');
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

    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function healHandler() {
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert('Your health is full!');
        currentPlayerHealth = chosenMaxLife;
    } else {
        increasePlayerHealth(HEAL_VALUE);
        currentPlayerHealth += HEAL_VALUE;
    }

    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);