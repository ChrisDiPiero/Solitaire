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
    console.log(`game over! ${won()}`)
  }
  createCard(".computer");
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
  console.log("computerDeck: " + computerDeck.length);
}

const tempHolding = function(takenDeck) { //adds to temp array for ties
  takenDeck.push(...temp.splice(0));
}

const createCard = function(player) {
  const thisDeck = document.querySelector(player);
  const cardFace = document.createElement('img');
  const thisCard = document.createElement('card');

  cardFace.classList.add('card', 'face');
  cardFace.setAttribute('src', '/images/playing_cards.svg')
  thisCard.classList.add('card_container');

  thisCard.appendChild(cardFace);
  thisDeck.appendChild(thisCard);
}

drawCard.addEventListener('click', playRound);
// while (!gameOver) {

// }