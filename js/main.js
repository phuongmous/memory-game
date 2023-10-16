/*----- constants -----*/
const cards = document.querySelectorAll('.card');
const timeRemaining = document.getElementById('time-remaining');
const scoreDisplay = document.getElementById('score');
const startButton = document.querySelector('.start-button');
const replayButton = document.querySelector('.replay-button');
const cardBacks = document.querySelectorAll('.card-back');
const cardFronts = document.querySelectorAll('.card-front');

/*----- app's state (variables) -----*/
const state = {
time: 20,
score: 0,
firstCard: null,
secondCard: null,
gameStarted: false
};

timeRemaining.innerText = state.time;
/*----- cached element references -----*/


/*----- event listeners -----*/
createCardImages();
//addEventListener when clicking on a card
cards.forEach(card => card.addEventListener('click', function(event) {const currentCard = this; flipCard(event); checkForMatch(currentCard)}));
//addEventListener when clicking on start button
startButton.addEventListener('click', countdownTimer);
//addEventListener when clicking on replay button
//replayButton.addEventListener('click', resetBoard);

/*----- functions -----*/
// give random images to cardFronts

function createCardImages() {
    const images = ['email.png', 'gingerbread.png', 'jumper.png', 'reindeer.png', 'snowman.png', 'sock.png', 'sweets.png', 'tree.png', 'email.png', 'gingerbread.png', 'jumper.png', 'reindeer.png', 'snowman.png', 'sock.png', 'sweets.png', 'tree.png'];
    const imageArray = [...images];
    imageArray.sort(() => Math.random() - 0.5);
    console.log(imageArray[0])
    cardFronts.forEach((cardFront, index) => {
        let img = document.createElement('img');
        img.src = `./imgs/${imageArray[index]}`;
        cardFront.appendChild(img)
    });
}

function flipCard(event) {
    const card = event.currentTarget;
    card.classList.toggle('flipped');}

// check if card 1 matches with card 2 or not
// if yes -> score = +1 and disable 2 matched cards
// if no -> score will remain and the cards will flip back

function checkForMatch(currentCard) {
    currentCardImage = currentCard.querySelector('img');
    currentCardImageSource = currentCard.querySelector('img[src]').getAttribute('src');
    if (state.firstCard == null) {
        state.firstCard = currentCardImageSource;
    } else {
        state.secondCard = currentCardImageSource;
        if (state.firstCard === state.secondCard) {
            state.score += 1;
            scoreDisplay.textContent = state.score;
            }
        else {
            setTimeout(() => {
                currentCardImage.setAttribute('src', 'imgs/back-card.png');
              }, 1000);
        }
        console.log(state.firstCard, state.secondCard);
     }  
}

function countdownTimer() {
    if (state.gameStarted == true) return;
    state.gameStarted = true;
    let timer = setInterval(function() {
        timeRemaining.innerHTML = state.time;
        state.time--;
        if (state.time < 0) {
            clearInterval(timer);
            replayButton.style.display = 'block';
        }
    }, 1000);
}
// click on replay button, the board resets and shuffle the cards