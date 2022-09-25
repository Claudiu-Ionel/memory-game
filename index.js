const main = document.querySelector(".main");
const cards = document.querySelectorAll(".flip-card")
const cardsArr = Array.from(cards)
let cardsInArray = []

const flipCalculations = async (card) => {
  if (!card.classList.contains("flipped")) {
    flipCard(card).then(() => {
      cardsInArray.push({ "cardElement": card, cardText: `${card.firstElementChild.nextElementSibling.innerHTML}` })
    }).then(() => {
      test()
    })


  }




  // setTimeout(() => {
  //   if (containsDuplicates(cardsInArray)) {
  //     cardsInArray = []
  //   }
  //   if (!containsDuplicates(cardsInArray)) {
  //     cardsInArray.forEach((card) => {
  //       unFlipCard(card.cardElement)
  //       cardsInArray = []
  //     })
  //   }
  // }, 700);
}


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
