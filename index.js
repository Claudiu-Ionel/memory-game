import {possibleCardValues, renderCards, shuffleArray, user} from './utils.js'
const cards_container = document.querySelector(".cards-container")
const cards_wrapper = document.querySelector(".cards-wrapper")
const countdown_container = document.querySelector(".countdown-container")
const countdownView = document.querySelector(".countdown");
const submitButton = document.querySelector("#submit-button");
const userNameInput = document.getElementById("user-name")
const userForm = document.querySelector(".user-form");
const messageContainer = document.querySelector(".message-container");
const messageDiv = document.querySelector(".message");
// Interval and time variables
let time = 0;
let countdown = 4;
let intervalID ;
let countdownID;

// event listeners to user form
submitButton.addEventListener("click", () => {
  console.log(userNameInput.value);
  user.UserName = userNameInput.value
  initiateCountdown()
  console.log(user.UserName);
})
function rendergame() {
  cards_wrapper.style.display = "flex"
// Shuffle the array so that I have them positioned randomly
  shuffleArray(possibleCardValues)
  
  
  //append the cards to DOM
  possibleCardValues.forEach((text) => {
    cards_container.append(renderCards(text))
  })
  const cards = document.querySelectorAll(".flip-card")
  const usernameH2 = document.querySelector("h2.username");
  usernameH2.innerHTML = user.UserName
  cards.forEach((card) => {
    card.addEventListener("click", flipCard)
  })
}

function initiateCountdown() {
  if (!countdownID) {
    countdown_container.style.display = "flex"
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
    messageContainer.style.display = "flex"
    messageDiv.innerHTML = `Congratulations ${user.UserName}! 
    You finished the game in ${time} seconds`
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

