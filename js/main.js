/*----- constants -----*/
const AUDIO = new Audio();
const cards = document.querySelectorAll('.card');
const cardBacks = document.querySelectorAll('.card-back');
const timeRemaining = document.getElementById('time-remaining');
const scoreDisplay = document.getElementById('score');
const startButton = document.querySelector('.start-button');
const replayButton = document.querySelector('.replay-button');
/*----- app's state (variables) -----*/
let time = 100;
let score = 0;
let lockBoard = false;
let hasFlippedCard = false;
let firstCard, secondCard;
let gameStarted = false;
timeRemaining.innerText = time;
/*----- cached element references -----*/


/*----- event listeners -----*/
//addEventListener when clicking on a card
cards.forEach(card => card.addEventListener('click', flipCard));
//addEventListener when clicking on start button
startButton.addEventListener('click', countdownTimer);
//addEventListener when clicking on replay button
replayButton.addEventListener('click', resetBoard);

/*----- functions -----*/

function flipCard() {

}
function countdownTimer() {
    if (gameStarted == true) return;
    gameStarted = true;
    let timer = setInterval(function(){
        timeRemaining.innerHTML = time;
        time--;
        if (time < 0) {
            clearInterval(timer);
            disableAllCards();
            replayButton.style.display = 'block';
        }
    }, 1000);
}

// check if card 1 matches with card 2 or not
// if yes -> score = +1 and disable 2 matched cards
// if no -> score will remain and the cards will flip back
function checkForMatch() {}
function disableCards() {}
function disableAllCards() {}
function unflipCards() {}

// click on replay button, the board resets and the cards' position randomly changes
function resetBoard() {
    time = 100;
    score = 0;
    lockBoard = false;
    hasFlippedCard = false;
    gameStarted = false;
    replayButton.style.display = 'none';
    timeRemaining.innerText = time;
}

function shuffle() {}
