export const possibleCardValues = [
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
  ]
    

export function renderCards(text) { 
  
  const flip_card = document.createElement("div")
  const flip_card_container = document.createElement("div")
  const flip_card_front = document.createElement("div")
  const flip_card_back = document.createElement("div")
  flip_card_container.classList.add("flip-card-container")
  flip_card.classList.add("flip-card")
  flip_card_front.classList.add("flip-card-front")
  flip_card_back.classList.add("flip-card-back")
  flip_card_back.innerText = `${text}`
  flip_card.dataset.secret = `${text}`
  flip_card.append(flip_card_front, flip_card_back)
  flip_card_container?.appendChild(flip_card)
  return flip_card_container
}
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}