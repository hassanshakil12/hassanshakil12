let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const text = document.querySelector("#text");
const monsterStat = document.querySelector("#monsterStat");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "Stick",
        power: 5
    },
    {
        name: "Dagger",
        power: 30
    },
    {
        name: "Claw Hammer",
        power: 50
    },
    {
        name: "Sword",
        power: 100
    }
];

const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Fierce Beast",
        level: 8,
        health: 60
    },
    {
        name: "Dragon",
        level: 20,
        health: 300
    }
];

const locations = [
    {
        name: "Town",
        "button Text": ["Go To Store", "Go To Cave", "Fight Dragon"],
        "button Function": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\""
    },
    {
        name: "Store",
        "button Text": ["Buy Health (10 Gold)", "Buy Weapon (30 Gold)", "Go to Town"],
        "button Function": [buyHealth, buyWeapon, goTown],
        text: "You Entered the \"Store\""
    },
    {
        name: "Cave",
        "button Text": ["Fight Slime", "Fight Fierce Beast", "Go to Town"],
        "button Function": [fightSlime, fightBeast, goTown],
        text: "You Entered the \"Cave\" and see some Monsters"
    },
    {
        name: "fight",
        "button Text": ["Attack", "Dodge", "Run"],
        "button Function": [attack, dodge, goTown],
        text: "You are fighting a monster"
    },
    {
        name: "Kill Monster",
        "button Text": ["Go To Town", "Go To Town", "Go To Town"],
        "button Function": [goTown, goTown, goTown],
        text: "You Defeated the Monster"
    },
    {
        name: "Lose",
        "button Text": ["Restart", "Restart", "Restart"],
        "button Function": [restart, restart, restart],
        text: "You Die"
    },
    {
        name: "Win",
        "button Text": ["Restart", "Restart", "Restart"],
        "button Function": [restart, restart, restart],
        text: "You defeated the Dragon, YOU WON THE GAME"
    }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
    button1.innerText = location["button Text"][0];
    button2.innerText = location["button Text"][1];
    button3.innerText = location["button Text"][2];
    button1.onclick = location["button Function"][0];
    button2.onclick = location["button Function"][1];
    button3.onclick = location["button Function"][2];
    text.innerText = location.text
}

function goTown() {
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 20;
        goldText.innerText = gold;
        healthText.innerText = health;
    }
    else{
        text.innerText = "You don't have enough gold to buy health";
    }
}

function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "Your new weapon is " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have " + inventory + ".";
        }
        else{
            text.innerText = "You don't have enough gold to buy new weapons."
        }
    }
    else{
        text.innerText = "You already have most powerful weapon";
        button2.innerText = "Sell Weapon";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if(inventory.length > 1 ){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift()
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += "In your inventory you have " + inventory + ".";
    }
    else{
        text.innerText = "Don't sell your only weapon"
    }
}


function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStat.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " Attack with your " + weapons[currentWeapon].name + ".";
    
    if(isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }
    else{
        text.innerText += "You Miss.";
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    } 
    else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();
    }

    if(Math.random() > 0.1 && inventory.length !== 1){
        text.innerText = "Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function isMonsterHit(){
    return Math.random() > 0.2 || health < 20;
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - Math.floor(Math.random() * xp);
    console.log(hit);
    return hit;
}

function dodge(){
    text.innerText = "You Dodged the attack from " + monsters[fighting].name + ".";
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4])
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"]
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown()
}