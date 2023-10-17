/*----- constants -----*/
const cards = document.querySelectorAll('.card');
const timeRemaining = document.getElementById('time-remaining');
const scoreDisplay = document.getElementById('score');
const startButton = document.querySelector('.start-button');
const replayButton = document.querySelector('.replay-button');
const cardFronts = document.querySelectorAll('.card-front');

/*----- app's state (variables) -----*/
const state = {
time: 20,
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

//addEventListener when clicking on start button
// the cards are clickable only after the game start button is clicked => game start button is hidden

//addEventListener when clicking on a card
cards.forEach(card => card.addEventListener('click', function cardClickHandler(event) {
    const currentCard = this;
    if ((!card.classList.contains('matched'))) {
        card.classList.add('flipped');
    } else {
        return;
    };
    checkForMatch(currentCard)}
    ));

startButton.addEventListener('click', countdownTimer);

//addEventListener when clicking on replay button
//replayButton.addEventListener('click', resetBoard);

/*----- functions -----*/
// give random images to cardFronts

function createCardImages() {
    const images = ['email.png', 'gingerbread.png', 'jumper.png', 'reindeer.png',
                    'snowman.png', 'sock.png', 'sweets.png', 'tree.png', 'email.png',
                    'gingerbread.png', 'jumper.png', 'reindeer.png', 'snowman.png',
                    'sock.png', 'sweets.png', 'tree.png'];
    const imageArray = [...images];
    imageArray.sort(() => Math.random() - 0.5);
    console.log(imageArray[0])
    cardFronts.forEach((cardFront, index) => {
        let img = document.createElement('img');
        img.src = `./imgs/${imageArray[index]}`;
        cardFront.appendChild(img)
    });
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

// when the time = 0 => the cards are unable to clicked
// click on replay button, the board resets and shuffle the cards
// => the game start buttn is shown & replay button is hidden
// write function resetBoard