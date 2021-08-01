export { DeckBuilder };

const suits = ["spades", "clubs", "hearts", "diamonds"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

class Card {
  constructor(suit, value) {
    this.suit = suit,
    this.value = value
  }
}

class DeckBuilder {
  constructor(cards = makeDeck()) {
    this.cards = cards
  }

  deckSort(deck) {
    for( let i = deck.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const  temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  }
}

const makeDeck = () => {
  return suits.flatMap(
    suit => {
      return values.map(
        value => {
          return new Card(suit, value);
        }
      )
    }
  )
}