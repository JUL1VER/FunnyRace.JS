"use strict";

const buttons = document.querySelectorAll(".glow-on-hover");
const buttonStart = buttons[0];
const buttonTable = buttons[1];
const buttonAddPlayer = buttons[2];
let players = document.querySelectorAll(".player");
const string = document.querySelector("tr");
const race = document.querySelector("tbody");
const cells = string.querySelectorAll("td");
const redPlayer = document.querySelector("red");
const leadersTable = document.querySelector(".leadersTable");
let positionFinish = race.getBoundingClientRect().left + race.getBoundingClientRect().width;
const positionStart = race.getBoundingClientRect().left;
let numberOfPlayers = players.length;
const playerWidth = players[0].getBoundingClientRect().width;
let maxId = 3;
const field = document.querySelector('.wrapperField');

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
    let flag = true;
    const finishedPlayers = [];

    while (flag) {
        players.forEach(item => {
            let randomStep = Math.floor(Math.random() * (88 - 10)) + 10;
            let positionPlayer = item.getBoundingClientRect().left;
            
            if (positionPlayer + randomStep >= positionFinish) {
                randomStep = positionFinish - positionPlayer - playerWidth;
            }
            
            move(item, positionPlayer, randomStep);

            positionPlayer = item.getBoundingClientRect().left;
            
            if (positionPlayer + playerWidth == positionFinish) {
                flag = false;
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
            <li>Игрок ${+index+1} - ${item} очков </li>
        `
    });

    let playersResults = document.getElementsByClassName('oneString');
    console.log(playersResults);
    playersResults[0].innerHTML = inputString;

    players.forEach(item => {
        finish(item, positionStart);
    })
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




// const finishbl = document.querySelector('.finish')
// finishbl.addEventListener('click', () => {
//     players.forEach(item => {
//         finish(item, positionStart);
//     })
// })


// var movePlayer = function f(elem) {
//     var elemLeft = elem.getBoundingClientRect().left;
//     if (elemLeft < 200) {
//       redPlayer.style.left = elemLeft + 1 + 'px';
//       setTimeout(f, 100, elem);
//     }
//   };

// buttonStart.addEventListener('click', function() {
//     movePlayer(redPlayer)
//     }, false);


// let widthOfPlayer = parseInt(getComputedStyle(players[0]).width);


// for (const value of onePlayer.values()) {
    //     let marginOfPlayer = value;
    //     return marginOfPlayer;
    //   }





// let b = parseInt(getComputedStyle(players).marginLeft);



// buttonStart.addEventListener('click',(event) => {
//     let a = parseInt(getComputedStyle(players).width);

//     players.forEach(item => {
//         let b = parseInt(getComputedStyle(item).marginLeft);
//         console.log(b);
//     });
// })

// while (parseInt(getComputedStyle(onePlayer).marginLeft) + widthOfPlayer < 1980) {
//     // margin-left = Math.floor(Math.random() * (88 - 10)) + 10;
// }