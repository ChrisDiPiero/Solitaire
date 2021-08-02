import { DeckBuilder } from './deckbuilder.js';

let gameOver = false;

// make and shuffle deck
const theDeck = new DeckBuilder();
theDeck.deckSort(theDeck.cards);
console.log(theDeck.cards);

const drawCard = document.querySelector('#button_draw');
const computerDeck = theDeck.cards.slice(0, (theDeck.cards.length / 2) );
const playerDeck = theDeck.cards.slice( (theDeck.cards.length / 2) );

let computerTakenCards = [];
let playerTakenCards = [];
let temp = [];

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

// war logic
const playRound = function () {
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

  if (computerDeck[0].value > playerDeck[0].value) {
    computerTakenCards.push(computerDeck.splice(0, 1), playerDeck.splice(0, 1));
    if(temp.length) {tempHolding(computerTakenCards)}
  } else if (computerDeck[0].value > playerDeck[0].value) {
    PlayerTakenCards.push(computerDeck.splice(0, 1), playerDeck.splice(0, 1));
    if(temp.length) {tempHolding(playerTakenCards)}
  } else {
    temp.push(computerDeck.splice(0, 1), playerDeck.splice(0, 1));
    playRound();
  }
}

const tempHolding = function(takenDeck) { //adds to temp array for ties
  takenDeck.push(...temp.splice(0));
}

const createCard = function(player, cardData) {
  
  // const playArea = document.querySelector(".play_area");
  // const cardFace = document.createElement('img');
  // const thisCard = document.createElement('card');

  // calcFace(player, cardData);

  // cardFace.classList.add('card', 'face');
  // cardFace.setAttribute('src', '/images/playing_cards.svg')
  
  // thisCard.classList.add('card_container', `${player}`);

  // thisCard.appendChild(cardFace);
  // playArea.appendChild(thisCard);
}



drawCard.addEventListener('click', playRound);
// while (!gameOver) {

// }