import { possibleCardValues, renderCards, user, shuffleArray, pokemonsArrayDoubled, renderFavoritePokemon } from './utils.js'
import { startGame } from "./pokedex.js"
const cards_container = document.querySelector(".cards-container")
const cards_wrapper = document.querySelector(".cards-wrapper")
const memory_game_content = document.querySelector(".memory-game-content")
const countdown_container = document.querySelector(".countdown-container")
const countdownView = document.querySelector(".countdown");
const pokedex = document.querySelector(".pokedex-container");
const messageContainer = document.querySelector(".message-container");
const messageDiv = document.querySelector(".message");
const submitButton = document.getElementById("submit-button")


// Interval and time variables
let time = 0;
let countdown = 4;
export let intervalID;
let countdownID;
let showModalAgain = true;

// event listeners to user form

submitButton.addEventListener("click", (event) => startGame(event, user, initiateCountdown))

export function renderGame() {

  cards_wrapper.style.display = "flex"

  // Shuffle the array so that I have them positioned randomly
  shuffleArray(pokemonsArrayDoubled)


  //append the cards to DOM
  pokemonsArrayDoubled.forEach((item) => {
    cards_container.append(renderCards(item.name, item.imgUrl))
  })
  const cards = document.querySelectorAll(".flip-card")
  const usernameH2 = document.querySelector("h2.username");
  usernameH2.innerHTML = user.UserName
  cards.forEach((card) => {
    card.addEventListener("click", flipCard)
  })
}

export function initiateCountdown() {
  console.log(countdownID)
  if (!countdownID) {
    pokedex.style.display = "none"
    countdown_container.style.display = "flex"
    memory_game_content.style.display = "flex"
    countdownID = setInterval(() => startCountdown(), 1000)

  }
}
export const startCountdown = () => {
  if (countdown !== 1) {
    countdown--
    blockBoard = true;
    countdownView.innerHTML = `${countdown}...`
  } else {
    countdownView.innerHTML = `GO`
    renderGame()
    clearInterval(countdownID)
    countdownID = null
    startTime()

  }
}


export const addToTimer = (intervalID) => {
  if (!intervalID) {
    time++
    countdownView.innerHTML = `${time}s`

  }
}
export const stopTime = () => {
  console.log("stopTime Func");
  console.log(intervalID);
  clearInterval(intervalID)
  intervalID = null
}
export function startTime() {
  console.log("startTime Func");
  time = 0
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
function flipCard() {
  if (blockBoard) return
  if (this === firstCard) return

  this.classList.add("flipped")

  if (!flippedCardBool) {
    flippedCardBool = true
    firstCard = this
    return
  }
  secondCard = this
  matchCards()
}

function matchCards() {

  let isMatch = firstCard.dataset.secret === secondCard.dataset.secret;
  isMatch ? disableCards() : unflipCards()
}

function disableCards() {
  nrOfMatchedCards++
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetVariables()
  if (nrOfMatchedCards === possibleCardValues.length / 2) {
    stopTime()
    nrOfMatchedCards = 0
    showModalAgain && displayFinalMessage(user.UserName, time)
    // messageContainer.showModal()
    // messageDiv.innerHTML = `Congratulations ${user.UserName}! 
    // You finished the game in ${time} seconds`
  }
}

function displayFinalMessage(userName, time) {
  showModalAgain = false
  messageContainer.showModal()
  const surpriseButton = document.querySelector(".surprise-button");
  messageDiv.innerHTML = `Congratulations ${userName}! 
    You finished the game in ${time} seconds`
  surpriseButton.addEventListener("click", renderFavoritePokemon)

}
function unflipCards() {
  blockBoard = true;
  setTimeout(() => {
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

