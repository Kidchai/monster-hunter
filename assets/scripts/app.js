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


const enteredValue = prompt('Maximum life for you and for monster', '100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) 
    chosenMaxLife = 100;

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

    if (event === EVENT_PLAYER_ATTACK || event === EVENT_PLAYER_STRONG_ATTACK)
        logEntry.target = 'MONSTER';
    else if (event === EVENT_MONSTER_ATTACK || event === EVENT_PLAYER_HEAL)
        logEntry.target = 'PLAYER';

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
    let maxDamange;
    if (attackType === ATTACK_TYPE) {
        maxDamange = ATTACK_VALUE;
    } else if (attackType === STRONG_ATTACK_TYPE) {
        maxDamange = STRONG_ATTACK_VALUE;
    }

    const monsterDamage = dealMonsterDamage(maxDamange);
    currentMonsterHealth -= monsterDamage;
    writeToLog(
        EVENT_PLAYER_ATTACK, 
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
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healHandler);
logBtn.addEventListener('click', printLogHandler);