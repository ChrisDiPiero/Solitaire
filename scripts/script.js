const SUITS = ["spades", "clubs", "hearts", "diamonds"];
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

class CardBuilder {
  constructor(suit, value) {
    this.suit = suit,
    this.value = value
  }
}

class DeckBuilder {
  constructor(card) {
    this.card = card
  }
}

const makeDeck = () => {
  SUITS.flatMap(
    suit => {
      VALUES.map(
        value => {
          new Card(suit, value);
        }
      )
    }
  )
}