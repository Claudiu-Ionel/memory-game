import {possibleCardValues, renderCards, shuffleArray, user} from './utils.js'
let time = 0;
let countdown = 4;
let intervalID ;
let countdownID;


const cards_container = document.querySelector(".cards-container")
const countdownView = document.querySelector(".countdown");
const submitButton = document.querySelector("#submit-button");
const userNameInput = document.getElementById("user-name")
const userForm = document.querySelector(".user-form");

submitButton.addEventListener("click", () => {
  console.log(userNameInput.value);
  user.UserName = userNameInput.value
  initiateCountdown()
  console.log(user.UserName);
})
function rendergame() {
  shuffleArray(possibleCardValues)

  //append the cards to DOM
  possibleCardValues.forEach((text) => {
    cards_container.append(renderCards(text))
  })
  const cards = document.querySelectorAll(".flip-card")
  cards.forEach((card) => {
    card.addEventListener("click", flipCard)
  })
}

function initiateCountdown() {
  if (!countdownID) {
    countdownID = setInterval(() => startCountdown(), 1000)

  }
}
const startCountdown = () => {
      if(countdown !== 1) {
        userForm.style.display = "none"
        countdown--
        blockBoard = true;
      countdownView.innerHTML = `${countdown}...`
      } else {
        countdownView.innerHTML = `GO`
        rendergame()
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
  blockBoard = false 
    intervalID = setInterval(() => addToTimer(), 1000);
    
}

//  flip-card-container flip-card flip-card-front flip-card-back


// Shuffle the array so that I have them positioned randomly


let firstCard, secondCard;
let flippedCardBool = false;

let blockBoard = false;
let nrOfMatchedCards = 0;
let endGame = false;


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
    stopTime()
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

