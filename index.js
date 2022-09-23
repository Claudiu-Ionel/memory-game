const main = document.querySelector(".main");
const cards = document.querySelectorAll(".flip-card")
const cardsArr = Array.from(cards)
const cardsInArray = []
console.log(cardsInArray);
setInterval(() => {

}, 200)

cards.forEach((card) => {
    card.addEventListener("click", () => {
        checkIf2CardsAreFlipped(card)
    })
})

function checkIf2CardsAreFlipped(cardToFlip) {
    let cardsFlipped = 0;
    cardToFlip.classList.add("flipped")
        const cardContent = cardToFlip.firstElementChild.nextElementSibling.innerHTML
        cardsInArray.push(cardContent)
        console.log(cardsInArray);
        cardToFlip.setAttribute("disabled" , true)
        console.log(cardContent)
    cardsArr?.filter((card)=> {
        if (card.classList.contains("flipped")) {
            if (cardsFlipped > 2) {
                return 
            } else {
                cardsFlipped++
            }
        }
    })
    if (cardsFlipped > 2) {
        cardsArr?.filter((card)=> {
            card.classList.remove("flipped")
        })
        cardToFlip?.ClassList?.toggle("flipped")
       }
    
   console.log(cardsFlipped);
}

function checkValueOfFlippedCard() {
    cardsArr.for
}




// .flip-card-container:hover .flip-card {
//     transform: rotateY(180deg); /* <=>  rotateY(.5turn) */
//   }