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
  constructor(card = makeDeck()) {
    this.card = card
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