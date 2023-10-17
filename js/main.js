/*----- constants -----*/
const cards = document.querySelectorAll('.card');
const timeRemaining = document.getElementById('time-remaining');
const scoreDisplay = document.getElementById('score');
const startButton = document.querySelector('.start-button');
const replayButton = document.querySelector('.replay-button');
const cardFronts = document.querySelectorAll('.card-front');

/*----- app's state (variables) -----*/
const state = {
time: 5,
score: 0,
firstCardSrc: null,
firstCard: null,
secondCardSrc: null,
gameStarted: false
};

timeRemaining.innerText = state.time;
/*----- cached element references -----*/


/*----- event listeners -----*/
createCardImages();

//addEventListener when clicking on a card

//addEventListener when clicking on start button
//the cards are clickable only after the game start button is clicked => game start button is hidden

//addEventListener when clicking on replay button


/*----- functions -----*/
// give random images to cardFronts

function createCardImages() {
    const images = ['email.png', 'gingerbread.png', 'jumper.png', 'reindeer.png',
                    'snowman.png', 'sock.png', 'sweets.png', 'tree.png', 'email.png',
                    'gingerbread.png', 'jumper.png', 'reindeer.png', 'snowman.png',
                    'sock.png', 'sweets.png', 'tree.png'];
    const imageArray = [...images];
    imageArray.sort(() => Math.random() - 0.5);
    cardFronts.forEach((cardFront, index) => {
        let img = document.createElement('img');
        img.src = `./imgs/${imageArray[index]}`;
        cardFront.appendChild(img)
    });
}

function cardClickHandler() {
    const currentCard = this;
    if ((!state.gameStarted || this.classList.contains('matched'))) {
        return;
    }
    this.classList.add('flipped');
    checkForMatch(currentCard);
}

cards.forEach(card => card.addEventListener('click', cardClickHandler, false));

startButton.addEventListener('click', (event) => {
    state.gameStarted = true;
    startButton.style.display = 'none';
    replayButton.style.display = 'none';
    countdownTimer();
    cards.forEach(card => card.addEventListener('click', cardClickHandler));
});

function countdownTimer() {
    let timer = setInterval(function() {
        timeRemaining.innerHTML = state.time;
        state.time--;
        if (state.time < 0) {
            clearInterval(timer);
            replayButton.style.display = 'block';
            cards.forEach(card => card.removeEventListener('click', cardClickHandler)); // when the time = 0 => the cards are unable to clicked
        }
    }, 1000);
}

function checkForMatch(currentCard) {
    console.log('currentCard', currentCard);
    currentCardImageSource = currentCard.querySelector('img[src]').getAttribute('src');
    if (state.firstCardSrc == null) {
        state.firstCardSrc = currentCardImageSource;
        state.firstCard = currentCard;
    } else {
        state.secondCardSrc = currentCardImageSource;
        if (state.firstCardSrc === state.secondCardSrc) {
            state.score += 1;
            scoreDisplay.textContent = state.score;
            state.firstCard.classList.add('matched');
            currentCard.classList.add('matched');
            state.firstCard = null;
            state.firstCardSrc = null;
            console.log('firstCardSrc', state.firstCardSrc);
            }
        else {
            setTimeout(() => {
                currentCard.classList.remove('flipped');
                state.firstCard.classList.remove('flipped');
                state.firstCardSrc = null;
                state.secondCardSrc = null;
                state.firstCard = null;
              }, 1000);  
            }  
        
     }
}

replayButton.addEventListener('click', resetBoard)

function resetBoard() {
    state.time = 5;
    state.score = 0;
    state.firstCardSrc = null;
    state.firstCard = null;
    state.secondCardSrc = null;
    state.gameStarted = false;
    timeRemaining.innerText = state.time;
    scoreDisplay.textContent = state.score;
    replayButton.style.display = 'none';
    startButton.style.display = 'block';
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    cardFronts.forEach(cardFront => {
        cardFront.getElementsByTagName("img");
        cardFront.removeChild(cardFront.getElementsByTagName("img")[0]);
    });
    createCardImages();
    cards.forEach(card => {
        card.removeEventListener('click', cardClickHandler);
        card.addEventListener('click', cardClickHandler, false);
    });
}