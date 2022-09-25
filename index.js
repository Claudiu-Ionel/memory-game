const main = document.querySelector(".main");

const cards_container = document.querySelector(".cards-container")


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
function renderCards(hiddenText) { 
  
  console.log(cards_container);
  const flip_card = document.createElement("div")
  const flip_card_container = document.createElement("div")
  const flip_card_front = document.createElement("div")
  const flip_card_back = document.createElement("div")
  flip_card_container.classList.add("flip-card-container")
  flip_card.classList.add("flip-card")
  flip_card_front.classList.add("flip-card-front")
  flip_card_back.classList.add("flip-card-back")
  flip_card_back.innerText = `${hiddenText}`
  flip_card.append(flip_card_front, flip_card_back)
  flip_card_container?.appendChild(flip_card)
  return flip_card_container
}


possibleCardValues.forEach((text) => {
  cards_container.append(renderCards(text))
})

const flipCalculations = async (card) => {
  if (!card.classList.contains("flipped")) {
    flipCard(card).then(() => {
      cardsInArray.push({ "cardElement": card, cardText: `${card.firstElementChild.nextElementSibling.innerHTML}` })
    }).then(() => {
      test()
    })


  }


}
const cards = document.querySelectorAll(".flip-card")
const cardsArr = Array.from(cards)
let cardsInArray = []

cards.forEach((card) => {
  card.addEventListener("click", () => flipCalculations(card), true)
})

async function flipCard(cardToFlip) {
  await cardToFlip.classList.add("flipped")
}
function unFlipCard(card) {
  card.classList.remove("flipped")
}
function test(card) {
  setTimeout(() => {
    if (containsDuplicates(cardsInArray)) {
      cardsInArray = []
    }
    if (!containsDuplicates(cardsInArray)) {
      cardsInArray.forEach((card) => {
        unFlipCard(card.cardElement)
        cardsInArray = []
      })
    }
  }, 1000);
}
function containsDuplicates(array) {
  console.log(array);
  if (array.length >= 1) {

    if (array[0].cardText === array[1].cardText) {
      return true;
    }


  }

}
