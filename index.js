const main = document.querySelector(".main");
const cards = document.querySelectorAll(".flip-card")
const cardsArr = Array.from(cards)
let cardsInArray = []


cards.forEach((card) => {
    card.addEventListener("click", () => {
        flipCard(card)
        cardsInArray.push({"cardElement": card, cardText: `${card.firstElementChild.nextElementSibling.innerHTML}`})
     
        if (containsDuplicates(cardsInArray)) {
            cardsInArray = []
        } 
        if (!containsDuplicates(cardsInArray)) {
                cardsInArray.forEach((card) => {
                    unFlipCard(card.cardElement)
                    cardsInArray = []
                })
        }
        
    })
})

function unflipCards() {
    cardsArr?.filter((card)=> {
        card.classList.toggle("flipped")
    })
}
function flipCard(cardToFlip) {
    cardToFlip.classList.add("flipped")
}
function unFlipCard(card) {
    card.classList.remove("flipped")
}
function containsDuplicates(array) {
    console.log(array);
    if (array.length >= 1){
        if (array[0].cardText === array[1].cardText) {
            return true;
          }
          return false;
    }
  }


// function checkValueOfFlippedCard() {
//     cardsArr.for
// }




// .flip-card-container:hover .flip-card {
//     transform: rotateY(180deg); /* <=>  rotateY(.5turn) */
//   }