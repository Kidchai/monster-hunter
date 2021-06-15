const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 16;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const ATTACK_TYPE = 'ATTACK';
const STRONG_ATTACK_TYPE = 'STRONG_ATTACK';

const EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const EVENT_GAME_OVER = 'GAME_OVER';

function getMaxLifeValue() {
    const enteredValue = prompt('Maximum life for you and for monster', '100');
    const parsedValue = parseInt(enteredValue);
    if (isNaN(parsedValue) || parsedValue <= 0)
        throw { message: 'Invalid user input.' };
    return parsedValue;
}

let chosenMaxLife;

try {
    chosenMaxLife = getMaxLifeValue();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered incorrect value, default value of 100 was used.')
}

let battleLog = [];
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };

    switch (event) {
        case EVENT_PLAYER_ATTACK:
        case EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case EVENT_MONSTER_ATTACK:
        case EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('It was close! Say thanks to your bonus life!')
    } else if (currentPlayerHealth <= 0) {
        alert('You lost!');
        reset(chosenMaxLife);
        writeToLog(
            EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
}

function attackMonster(attackType) {
    let maxDamange = attackType === ATTACK_TYPE ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let logevent =
        attackType === ATTACK_TYPE
            ? EVENT_PLAYER_ATTACK :
            EVENT_PLAYER_STRONG_ATTACK;

    const monsterDamage = dealMonsterDamage(maxDamange);
    currentMonsterHealth -= monsterDamage;
    writeToLog(
        logevent,
        monsterDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    if (currentMonsterHealth <= 0) {
        writeToLog(
            EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
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
    let healValue;

    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        healValue = chosenMaxLife - currentPlayerHealth
        alert('Your health is full!');
    } else {
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;

    writeToLog(
        EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );

    endRound();
}

function printLogHandler() {
    for (let i = 0; i < battleLog.length; i++) {
        console.log(battleLog);
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLogHandler);