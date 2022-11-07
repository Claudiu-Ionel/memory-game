import {possibleCardValues, renderCards, shuffleArray} from './utils.js'
let time = 0;
let countdown = 4;
let intervalID ;
let countdownID;
const cards_container = document.querySelector(".cards-container")
const countdownView = document.querySelector(".countdown");
const startCounterButton = document.querySelector(".startCounter");
const stopCounterButton = document.querySelector(".stopCounter");



(function initiateCountdown() {
  if (!countdownID) {
    countdownID = setInterval(() => startCountdown(), 1000)
  }
})()
const startCountdown = () => {
      if(countdown !== 1) {
        countdown--
      countdownView.innerHTML = `${countdown}...`
      } else {
        clearInterval(countdownID)
        startTime()
      }
}


const addToTimer = (intervalID) => {
  if (!intervalID) {
    time++
  countdownView.innerHTML = time
  
  }
}
const stopTime = () => {
clearInterval(intervalID)
intervalID = null
}
function startTime() {
  console.log("startTime");
    intervalID = setInterval(() => addToTimer(), 1000);
  
}

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
let nrOfMatchedCards = 0;
let endGame = false;

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
  nrOfMatchedCards++
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetVariables()
  console.log(`nrOfMatchedCards, ${nrOfMatchedCards}`);
  if(nrOfMatchedCards === possibleCardValues.length / 2) {
    clearInterval(intervalID)
  }
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

