"use strict";

let players = document.querySelectorAll(".player");
const buttons = document.querySelectorAll(".myButton");
const buttonStart = buttons[0];
const buttonTable = buttons[1];
const buttonAddPlayer = buttons[2];
const string = document.querySelector("tr");
const race = document.querySelector("tbody");
const cells = string.querySelectorAll("td");
const redPlayer = document.querySelector("red");
const leadersTable = document.querySelector(".leadersTable");
const positionFinish = race.getBoundingClientRect().left + race.getBoundingClientRect().width;
const positionStart = race.getBoundingClientRect().left;
const playerWidth = players[0].getBoundingClientRect().width;
const field = document.querySelector('.wrapperField');
let numberOfPlayers = players.length;
let maxId = 3;
let counter = 0;

const sleep = ms => new Promise(r => setTimeout(r, ms));

function finish(element, from) {
    element.style.left = from + 3 + 'px';
}

function move(element, from, step) {
    from += step;
    element.style.left = from + 'px';
}

let scoreMap = new Map();
let pointMap = new Map([
    ['first', 3],
    ['scd', 2],
    ['thr', 1]
]);
 
players.forEach((item, index) => {
    scoreMap.set(index + '', 0)
})

buttonStart.addEventListener('click', async (e) => {
    
    counter = counter + 1;

    buttonStart.disabled = true;
    buttonAddPlayer.disabled = true;

    let nobodyFinished = true;
    const finishedPlayers = [];

    while (nobodyFinished) {
        players.forEach(item => {
            let randomStep = Math.floor(Math.random() * (88 - 10)) + 10;
            let positionPlayer = item.getBoundingClientRect().left;
            
            if (positionPlayer + randomStep >= positionFinish) {
                randomStep = positionFinish - positionPlayer - playerWidth;
            }
            
            move(item, positionPlayer, randomStep);

            positionPlayer = item.getBoundingClientRect().left;
            
            if (positionPlayer + playerWidth == positionFinish) {
                nobodyFinished = false;
            }
        })
        
        await sleep(100);
    }

    players.forEach(i => {
        finishedPlayers.push({id: i.id, position: i.getBoundingClientRect().left});
    })

    finishedPlayers.sort((player1, player2) => {
        if (player1.position > player2.position) {
            return -1;
        }
        if (player1.position < player2.position) {
            return 1;
        }
        return 0;
    })

    scoreMap.set(finishedPlayers[0].id, scoreMap.get(finishedPlayers[0].id) + pointMap.get('first'))
    scoreMap.set(finishedPlayers[1].id, scoreMap.get(finishedPlayers[1].id) + pointMap.get('scd'))
    scoreMap.set(finishedPlayers[2].id, scoreMap.get(finishedPlayers[2].id) + pointMap.get('thr'))

    let inputString = '';

    const mapSort1 = new Map([...scoreMap.entries()].sort((a, b) => b[1] - a[1]));

    mapSort1.forEach((item, index) => {
        inputString += `
            <li style="font-size: 30px">Игрок ${+index+1} - ${item} очков </li>
        `
    });

    let playersResults = document.getElementsByClassName('oneString');
    playersResults[0].innerHTML = inputString;

    players.forEach(item => {
        finish(item, positionStart);
    })
    
    let inputCycles = '';
    inputCycles += `<div style="margin: 20px 0px 0px 40px; font-size: 35px">Число кругов - ${counter}</div>`;
    let cyclesRace = document.getElementsByClassName('cycles');
    cyclesRace[0].innerHTML = inputCycles;
    buttonStart.disabled = false;
    buttonAddPlayer.disabled = false;
})

const toggleTable = () => {
    leadersTable.classList.toggle('active');
}

buttonTable.addEventListener('click', () => {
    toggleTable();
})

buttonAddPlayer.addEventListener('click', () => {
    let newPlayerRow = document.createElement('tr');
    let startPlayerCell = document.createElement('td');

    const newPlayer = document.createElement('div');
    newPlayer.classList.add('player');
    newPlayer.id = maxId++;
    newPlayer.style = "background-color: " + '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
    newPlayer.innerHTML = `
        ${+newPlayer.id+1}
    `
    scoreMap.set(newPlayer.id, 0);

    race.appendChild(newPlayerRow);
    newPlayerRow.appendChild(startPlayerCell);
    startPlayerCell.appendChild(newPlayer);
    for (let i = 1; i <= 8; i++) {
        let playerCell = document.createElement('td');
        newPlayerRow.appendChild(playerCell);
    }
})

buttonAddPlayer.addEventListener('click', () => {
    players = document.querySelectorAll(".player");
})
