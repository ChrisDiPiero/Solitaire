import { DeckBuilder } from './deckbuilder.js';

// let gameOver = false;
let drawThree = false;

// make and shuffle deck
let theDeck = new DeckBuilder();
theDeck.deckSort(theDeck.cards);

const closeButton = document.querySelector('.start-game');
const replayButton = document.querySelector('.replay');
const drawCard = document.querySelector('#button_draw');
const computerScore = document.querySelector('#comp-score');
const playerScore = document.querySelector('#play-score');
const overlay = document.querySelector('.overlay');
const winOverlay = document.querySelector('.who-won');

let computerDeck = theDeck.cards.slice(0, (theDeck.cards.length / 2) );
let playerDeck = theDeck.cards.slice( (theDeck.cards.length / 2) );

let computerTakenCards = [];
let playerTakenCards = [];
let temp = [];

drawCard.disabled = true;

//global Functions
const calcFace = function(player, cardData) {
  let x = cardData.value - 2;
  let y;
  switch(cardData.suit) {
    case "spades":
      y = 0;
      break;
    case "clubs":
      y = 1;
      break;
    case "hearts":
      y = 2;
      break;
    case "diamonds":
      y = 3;
      break;
  }

  const root = document.documentElement;
  root.style.setProperty(`--svg-position-${player}`, `${-179.5 * x}px ${-252 * y}px`);
}

const startGame = function () {
  drawCard.disabled = false;
  overlay.remove();
}

const updateScore = function () {
  computerScore.innerHTML = computerTakenCards.length;
  playerScore.innerHTML = playerTakenCards.length;
}

// const flashScore = function (side) {
//   if (side === "computer") {
//     computerScore.classList.add('score-flash');
//   } else if (side === "player") {
//     playerScore.classList.add('score-flash');
//   }
// }



// const makeWarNotLove = function () {

// }

const removeCards = function (computerCard, playerCard, side) {
  computerScore.classList.remove('score-flash');
  playerScore.classList.remove('score-flash');
  // flashScore(side);
  setTimeout(function () {
    computerCard.remove();
    playerCard.remove();
    drawCard.disabled = false;
    updateScore(side);
  }, 3500);
}

const flashCard = function (side, computerCard, playerCard) {
  let thisCard = side === 'computer' ? playerCard : computerCard;
  let cardImg = thisCard.children[0];
  cardImg.classList.add('death-flash');
}

const endRound = function (takenCards, side) {
  takenCards.push(computerDeck.splice(0, 1), playerDeck.splice(0, 1)); // pushes won cards to this take pile
  if(temp.length && side !== "tie") {tempHolding(takenCards)} // pulls temp cards (from tie) to this take pile
  console.log(`The ${side} won.`);
  const computerCard = document.querySelector('.computer-face-card');
  const playerCard = document.querySelector('.player-face-card');

  flashCard(side, computerCard, playerCard);
  removeCards(computerCard, playerCard);

  if (!computerDeck.length || !playerDeck.length) {
    whoWon();
  }
}

const tempHolding = function(takenDeck) { //pulls all cards from temp array into winner
  takenDeck.push(...temp.splice(0));
}

const createCard = function(side, cardData) {
  const playArea = document.querySelector('.play_area');
  const cardFace = document.createElement('img');
  const thisCard = document.createElement('card');

  calcFace(side, cardData);

  cardFace.classList.add('card', 'face');
  cardFace.setAttribute('src', './images/playing_cards.svg')
  
  thisCard.classList.add('card_container', `${side}`, `${side}-face-card`);

  thisCard.appendChild(cardFace);
  playArea.appendChild(thisCard);
}

const displayWinner = function (winText) {
  const textContainer = document.createElement('h2');
  textContainer.classList.add('h2', 'win-text');
  const newText = document.createTextNode(winText);
  textContainer.appendChild(newText);
  const appendedDiv = document.querySelector('.append');
  appendedDiv.appendChild(textContainer);
  winOverlay.style.display = 'block';
}


const whoWon = function () {
  drawCard.disabled = true;
  let winner;
  if (computerTakenCards.length > playerTakenCards.length) {
    winner = "The computer won!"
  } else if(computerTakenCards.length < playerTakenCards.length) {
    winner = "You won!"
  } else {
    winner = "It was a tie!"
  }
  displayWinner(winner);
}

const replayGame = function () {
  document.querySelector('.win-text').remove();
  winOverlay.style.display = 'none';
  theDeck = new DeckBuilder();
  theDeck.deckSort(theDeck.cards);

  computerDeck = theDeck.cards.slice(0, (theDeck.cards.length / 2) );
  playerDeck = theDeck.cards.slice( (theDeck.cards.length / 2) );

  computerTakenCards = [];
  playerTakenCards = [];
  temp = [];
  drawCard.disabled = false;
}


// war logic
const playRound = function () {
  drawCard.disabled = true;
  createCard("computer", computerDeck[0]);
  console.log(computerDeck[0]);
  createCard("player", playerDeck[0]);
  console.log(playerDeck[0]);
  console.log(temp.length);

  if (computerDeck[0].value > playerDeck[0].value) { // computer wins round
    endRound(computerTakenCards, "computer");
  } 
  else if (computerDeck[0].value < playerDeck[0].value) { //player wins round
    endRound(playerTakenCards, "player");
  } 
  else { //tie
    if(drawThree) {
      makeWarNotLove(); //tests for house rule draw three
    }
    endRound(temp, "tie");
  }
}



closeButton.addEventListener('click', startGame);
drawCard.addEventListener('click', playRound);
replayButton.addEventListener('click', replayGame);
// while (!gameOver) {

// }