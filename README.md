> Know thy self, know thy enemy. A thousand battles, a thousand victories.
> - Sun Tzu

# War Card Game

This is a game I put together for a Mintbean hack-a-thon. The object was to build a card game. This is my entry for a front-end only deployment. It is made with vanilla JavaScript and HTML with a bit of CSS animation.

I built the app mobile first, using CSS variables to make resizing for a larger screen size much easier.

I also tried to keep as much of the logic as functional as possible since my next step will be to code a go-fish game with the same interface and re-using as much of the code as possible.

The card faces are a grid in a single SVG that I made in Illustrator. The card face and value data pulled from the player decks is used to calculate the object position of the SVG (ala sprite sheet animation).

## Tech Used:

All vanilla CSS and JavaScript.

I got help getting started with building the deck of cards from the video:
*How to build a simple card game with JavaScript*
https://www.youtube.com/watch?v=NxRwIZWjLtE&t=609s

The deck shuffling I got from here:
*Fisher-Yates Sort*
https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb

The "nuke" svg came from:
*explosion by Julien Meysmans from the Noun Project*
https://thenounproject.com/M_Julz/

## Deployed Site:
https://chrisdipiero.github.io/WarCardGame/

## Team:
Yours truly:
Chris DiPiero
https://www.linkedin.com/in/christopherdipiero
https://chrisdipiero.github.io/landingpage/