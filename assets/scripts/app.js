const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 16;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(attackType) {
    let maxDamange;
    if (attackType === 'ATTACK') {
        maxDamange = ATTACK_VALUE;
    } else if (attackType === 'STRONG_ATTACK') {
        maxDamange = STRONG_ATTACK_VALUE;
    }

    const monsterDamage = dealMonsterDamage(maxDamange);
    currentMonsterHealth -= monsterDamage;
    if (currentMonsterHealth <= 0)
        alert('You won!');

    const playerDamage = dealPlayerDamage(maxDamange);
    currentPlayerHealth -= playerDamage;
    if (currentPlayerHealth <= 0)
        alert('You lost!');
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);