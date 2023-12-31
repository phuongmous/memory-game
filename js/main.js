/*----- constants -----*/
const cards = document.querySelectorAll('.card');
const timeRemaining = document.getElementById('time-remaining');
const scoreDisplay = document.getElementById('score');
const startButton = document.querySelector('.start-button');
const replayButton = document.querySelector('.replay-button');
const stopMusicImage = document.getElementById('stop-music-image');
const message = document.querySelector('.message');

/*----- app's state (variables) -----*/
const initialState = {
time: 30,
score: 0,
firstCardSrc: null,
firstCard: null,
secondCardSrc: null,
gameStarted: false,
cardIsAllowedToFlip: true,
gameisEnded: false,
};

let state = {...initialState};

timeRemaining.innerText = state.time;

/*----- event listeners -----*/
startButton.addEventListener('click', (event) => {
    state.gameStarted = true;
    cards.forEach(card => card.addEventListener('click', cardClickHandler));
    hideControlButtons();
    startCountdownTimer();
    playMusic();
});

replayButton.addEventListener('click', resetBoard);

stopMusicImage.addEventListener('click', stopMusic);

/*----- functions -----*/

// give random images to cardFronts
createCardImages();

function createCardImages() {
    const images = [
        'email.png',
        'gingerbread.png',
        'jumper.png',
        'reindeer.png',
        'snowman.png',
        'sock.png',
        'sweets.png',
        'tree.png',
        'email.png',
        'gingerbread.png',
        'jumper.png',
        'reindeer.png',
        'snowman.png',
        'sock.png',
        'sweets.png',
        'tree.png'
    ];
    const imageArray = [...images];
    imageArray.sort(() => Math.random() - 0.5);
    cards.forEach((card, index) => {
        let img = document.createElement('img');
        img.src = `./imgs/${imageArray[index]}`;
        card.querySelector('.card-front').appendChild(img);
    });
}

function startCountdownTimer() {
    let timer = setInterval(function() {
        timeRemaining.innerHTML = state.time;
        state.time--;
        if (state.time < 0 || scoreDisplay.textContent === '8') {
            clearInterval(timer);
            state.gameisEnded = true;
            replayButton.style.display = 'block';
            cards.forEach((card) => {
                //flip all the cards and disable click event
                card.classList.add('flipped', 'disabled');
                });
        }
    }, 1000);
}

function cardClickHandler() {
    if (
        !state.gameStarted ||
        this.classList.contains('matched') ||
        !state.cardIsAllowedToFlip
        ) {
        return;
    }
    const currentCard = this;
    this.classList.add('flipped');
    checkForMatch(currentCard);
}

function checkForMatch(currentCard) {
    let currentCardImageSrc = currentCard
    .querySelector('img')
    .getAttribute('src');
    if (state.firstCardSrc === null) {
        // if there is no card selected
        state.firstCardSrc = currentCardImageSrc;
        state.firstCard = currentCard;
        state.firstCard.classList.add('disabled'); // prevent 2 clicks on first card 
    } else {
        // if first card is selected
        state.secondCardSrc = currentCardImageSrc;
        state.cardIsAllowedToFlip = false;
        if (state.firstCardSrc === state.secondCardSrc) {
            // compare cards
            scoreDisplay.textContent = state.score += 1;
            state.firstCard.classList.add('matched');
            currentCard.classList.add('matched');
            state.cardIsAllowedToFlip = true;
            // allow clicking other cards
            state.firstCardSrc = null;
            // clear the first card
            if (scoreDisplay.textContent === '8') {
                message.innerText = 'Congrats! You won';
            }
            }
        else {
            // cards are not matched
            setTimeout(() => {
                if (!state.gameisEnded) {
                    //prevent cards from flipping when the game is ended
                    currentCard.classList.remove('flipped');
                    state.firstCard.classList.remove('flipped');
                    state.firstCard.classList.remove('disabled'); //allow clicking the 1st card
                }
                state.firstCardSrc = null;
                state.secondCardSrc = null;
                state.cardIsAllowedToFlip = true;
              }, 500);  
            }  
        }
}

function resetBoard() {
    state = {...initialState, gameStarted: true}; //reset state
    timeRemaining.innerText = state.time;
    scoreDisplay.textContent = state.score;
    message.innerText = '';
    hideControlButtons()
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched', 'disabled');
        card.querySelector('img').remove();
    });
    createCardImages();
    startCountdownTimer();
}

function hideControlButtons() {
    startButton.style.display = 'none';
    replayButton.style.display = 'none';
}

function playMusic() {
    audio = document.querySelector('audio');
    audio.volume = 0.1;
    audio.play();
    }

function stopMusic() {
    audio.pause();
}