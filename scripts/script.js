import { DeckBuilder } from './deckbuilder.js';

let gameOver = false;
let drawThree = false;

// make and shuffle deck
const theDeck = new DeckBuilder();
theDeck.deckSort(theDeck.cards);
console.log(theDeck.cards);

const closeButton = document.querySelector('.close');
const drawCard = document.querySelector('#button_draw');
const computerScore = document.querySelector('#comp-score');
const playerScore = document.querySelector('#play-score');
const overlay = document.querySelector('.overlay');

const computerDeck = theDeck.cards.slice(0, (theDeck.cards.length / 2) );
const playerDeck = theDeck.cards.slice( (theDeck.cards.length / 2) );

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
  overlay.remove();
  drawCard.disabled = false;
}

const updateScore = function () {
  computerScore.innerHTML = computerTakenCards.length;
  playerScore.innerHTML = playerTakenCards.length;
}

const shootCard = function () {

}

const makeWarNotLove = function () {

}

const removeCards = function () {
  let computerCard = document.querySelector(".computer-face-card");
  let playerCard = document.querySelector(".player-face-card");
  setTimeout(function () {
    computerCard.remove();
    playerCard.remove();
    drawCard.disabled = false;
  }, 1000);
}

const endRound = function (takenCards, side) {
  takenCards.push(computerDeck.splice(0, 1), playerDeck.splice(0, 1)); // pushes won cards to this take pile
  if(temp.length && side !== "tie") {tempHolding(takenCards)} // pulls temp cards (from tie) to this take pile
  console.log(`The ${side} won.`);
  removeCards();
  updateScore();
}

const tempHolding = function(takenDeck) { //pulls all cards from temp array into winner
  takenDeck.push(...temp.splice(0));
}

const createCard = function(side, cardData) {
  const playArea = document.querySelector(".play_area");
  const cardFace = document.createElement('img');
  const thisCard = document.createElement('card');

  calcFace(side, cardData);

  cardFace.classList.add('card', 'face');
  cardFace.setAttribute('src', '/images/playing_cards.svg')
  
  thisCard.classList.add('card_container', `${side}`, `${side}-face-card`);

  thisCard.appendChild(cardFace);
  playArea.appendChild(thisCard);
}


// war logic
const playRound = function () {
  drawCard.disabled = true;
  if (!computerDeck.length || !playerDeck.length) {
    let won = () => {
      if (computerTakenCards.length > playerTakenCards.length) {
        return "The computer won!"
      } else if(computerTakenCards.length < playerTakenCards.length) {
        return "You won!"
      } else {
        return "It was a tie!"
      }
    }
    alert(`game over! ${won()}`);
  }

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
// while (!gameOver) {

// }