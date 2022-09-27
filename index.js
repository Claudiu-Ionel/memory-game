import {giveRandomValues} from './utils.js'
const cards_container = document.querySelector(".cards-container")
let blockCalculation = true;

const possibleCardValues = [
  "secret1",
  "secret2",
  "secret3",
  "secret4",
  "secret1",
  "secret2",
  "secret3",
  "secret4",
  "secret5",
  "secret5",
  "secret6",
  "secret6",
  "secret7",
  "secret7",
  "secret8",
  "secret8",
  "secret9",
  "secret9",
  "secret10",
  "secret10",
]
//  flip-card-container flip-card flip-card-front flip-card-back
function renderCards(text) { 
  
  const flip_card = document.createElement("div")
  const flip_card_container = document.createElement("div")
  const flip_card_front = document.createElement("div")
  const flip_card_back = document.createElement("div")
  flip_card_container.classList.add("flip-card-container")
  flip_card.classList.add("flip-card")
  flip_card_front.classList.add("flip-card-front")
  flip_card_back.classList.add("flip-card-back")
  flip_card_back.innerText = `${text}`
  flip_card.append(flip_card_front, flip_card_back)
  flip_card_container?.appendChild(flip_card)
  return flip_card_container
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffleArray(possibleCardValues)
possibleCardValues.forEach((text) => {
  cards_container.append(renderCards(text))
  console.log(text);
})


const flipCalculations = async (card) => {
  if (!card.classList.contains("flipped") || cardsInArray.length <= 2) {
    addToArray(card)
    flipCard(card)
  
  }


}
const cards = document.querySelectorAll(".flip-card")
const cardsArr = Array.from(cards)
let cardsInArray = []

cards.forEach((card) => {
  card.addEventListener("click", () => flipCalculations(card), true)
  card.addEventListener("transitionend", test)
})

function allowCalculations() {
  console.log("transitionEnd");
   blockCalculation = true
}
async function addToArray(card) {
  cardsInArray.push({ "cardElement": card, cardText: `${card.firstElementChild.nextElementSibling.innerHTML}` })
}
async function flipCard(cardToFlip) {
  if (cardsInArray.length <= 2) {
    await cardToFlip.classList.add("flipped")
  }
}
function unFlipCard(card) {
  card.classList.remove("flipped")
}
 function test(card) {
  console.log(cardsInArray.length);
  if (cardsInArray.lenght > 1) {
    containsDuplicates(cardsInArray)
  }
    
  // }, 1000);
}
function containsDuplicates(array) {
  console.log(array);
  let result; 

    if (array[0].cardText === array[1]?.cardText) {
      result = true
    }
    if (array[0].cardText !== array[1]?.cardText) {
    
      cardsInArray.forEach((card) => {
        card.classList.remove("flipped")
      })
    }
    

  

}
