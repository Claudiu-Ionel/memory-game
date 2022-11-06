import {possibleCardValues, renderCards, shuffleArray} from './utils.js'
let countdownNum = 0;
const cards_container = document.querySelector(".cards-container")
const countdownView = document.querySelector(".countdown");
const startCounterButton = document.querySelector(".startCounter");
const stopCounterButton = document.querySelector(".stopCounter");


let intervalID ;




const addToTimer = () => {
  countdownNum++
  countdownView.innerHTML = countdownNum
}
const stopTime = () => {
clearInterval(intervalID)
intervalID = null
}
function startTime() {
  console.log("startTime");
  if (!intervalID) {
    intervalID = setInterval(() => addToTimer(), 1000);
  }
}
startCounterButton.addEventListener("click", startTime)
stopCounterButton.addEventListener("click", stopTime)

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

