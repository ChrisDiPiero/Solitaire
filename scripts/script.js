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

const tempHolding = function(takenDeck) {
  takenDeck.push(...temp.splice(0));
}

drawCard.addEventListener('click', playRound);
// while (!gameOver) {

// }