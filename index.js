import {possibleCardValues, renderCards, shuffleArray} from './utils.js'
const cards_container = document.querySelector(".cards-container")
let blockCalculation = true;


//  flip-card-container flip-card flip-card-front flip-card-back


// Shuffle the array so that I have them positioned randomly
shuffleArray(possibleCardValues)

//append the cards to DOM
possibleCardValues.forEach((text) => {
  cards_container.append(renderCards(text))
})
const cards = document.querySelectorAll(".flip-card")
let firstCard, secondCard;
let flippedCardBool = false;

let blockBoard = false;

cards.forEach((card) => {
  card.addEventListener("click", flipCard)
})

// Flip Card Function
function flipCard ()  {
  if (blockBoard) return
  if (this === firstCard) return

  this.classList.add("flipped")

  if (!flippedCardBool ) {
    flippedCardBool = true
    firstCard = this
    console.log("firstCard:", firstCard);
    return
  }
  secondCard = this
  console.log("secondCard:", secondCard);
  matchCards()
}

function matchCards() {
  
  let isMatch = firstCard.dataset.secret === secondCard.dataset.secret;
  isMatch ? disableCards() : unflipcards()
  console.log(`matchCards func: isMatch = ${isMatch}`)
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetVariables()
}
function unflipcards() {
  blockBoard = true;
   setTimeout(() =>{
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetVariables()
   }, 1000)
  }
function resetVariables() {
  flippedCardBool = false;
  blockBoard = false;
  firstCard = null;
  secondCard = null;
}
// function allowCalculations() {
//   console.log("transitionEnd");
//    blockCalculation = true
// }
// async function addToArray(card) {
//   cardsInArray.push(card)
// }
// async function flipCard(cardToFlip) {
//   if (cardsInArray.length <= 2) {
//     await cardToFlip.classList.add("flipped")
//   }
// }
// function unFlipCard(card) {
//   card.classList.remove("flipped")
// }
//  function test(card) {
//   console.log(cardsInArray.length);
//   if (cardsInArray.lenght > 1) {
//     containsDuplicates(cardsInArray)
//   }
    
//   // }, 1000);
// }
// function containsDuplicates(array) {
//   console.log(array);
//   let result; 

//     if (array[0].cardText === array[1]?.cardText) {
//       result = true
//     }
//     if (array[0].cardText !== array[1]?.cardText) {
    
//       cardsInArray.forEach((card) => {
//         card.classList.remove("flipped")
//       })
//     }
    

  

// }
