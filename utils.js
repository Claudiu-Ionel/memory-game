// this was used to test the matching system in the cards

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
// function that shuffles an array
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// constant for user data
export const user = {
  UserName: "",
  UserTime: 0,
}

const messageContainer = document.querySelector(".message-container");
// random value used in the apiCall which is added to the offset parameter in the pokemonAPI url
let pokemonOfSet = Math.ceil(Math.random() * 10)
let pokemonLimit = 6;
// example of url for pokemon image - I will use this in the images of the cards
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png


export let pokemonsList;
export let pokemonsArray;
export let pokemonsArrayDoubled;

async function fetchPokemonData() {
  await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${pokemonLimit}&offset=${pokemonOfSet}`)
    .then((response) => response.json())
    .then((data) => pokemonsList = data);
  // map over the array in order to add a key "imgUrl" so that I can use them in the start of the game

  pokemonsArray = pokemonsList?.results?.map((item) => {
    //used regex to get the last numbers from the url - EX  : "https://pokeapi.co/api/v2/pokemon/5/"

    let i = item.url.substring(item.url.length - 4, item.url.length).match(/(\d+)/);
    // add key called "imgUrl" to the objects in the pokemons array 
    item.imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i[0]}.png`;

    return item
  })

  // needed to double the contents in the array to create matches for the cards
  pokemonsArrayDoubled = [...pokemonsArray, ...pokemonsArray]
}
fetchPokemonData();

export function renderCards(text, ImgUrl) {

  const flip_card = document.createElement("div")
  const flip_card_container = document.createElement("div")
  const flip_card_front = document.createElement("div")
  const flip_card_back = document.createElement("div")
  flip_card_container.classList.add("flip-card-container")
  flip_card.classList.add("flip-card")
  flip_card_front.classList.add("flip-card-front")
  flip_card_back.classList.add("flip-card-back")
  flip_card_back.style.backgroundImage = `url(${ImgUrl})`
  flip_card_back.innerText = `${text}`
  flip_card.dataset.secret = `${text}`
  flip_card.append(flip_card_front, flip_card_back)
  flip_card_container?.appendChild(flip_card)
  return flip_card_container
}
export function renderFavoritePokemon() {
  messageContainer.close()
  const cards = document.querySelectorAll(".flip-card")
  const backOfCards = document.querySelectorAll(".flip-card-back")
  cards.forEach((card) => {
    card.classList.remove("flipped")
  })
  backOfCards.forEach((item, index) => {
    item.innerText = ""
    item.style.backgroundImage = `url("./haunter-sliced_1/haunter-${index + 1}.jpg")`
    item.classList.toggle("bg-size-cover")
  })
  flipAllCards()

}
function pokemonStats(container, data) {
  const listItem = document.createElement("li")
  listItem.innerHTML = `<div>${data.stat.name}: <span>${data.base_stat}</span></div>`
  container.append(listItem)
}
async function flipAllCards() {
  const cards = document.querySelectorAll(".flip-card")
  const cards_container = document.querySelector(".cards-container")
  const cards_wrapper = document.querySelector(".cards-wrapper")
  const pokemon_stats = document.querySelector(".pokemon-stats")
  const stats_list = document.querySelector(".stats-list")

  await fetch(`https://pokeapi.co/api/v2/pokemon/haunter`)
    .then((response) => response.json())
    .then((data) => {
      data.stats.forEach((stat) => {
        pokemonStats(stats_list, stat)
      })
    });

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped")
    }, 500 * index)
  })
  setTimeout(() => {
    cards_container.classList.toggle("resized")
    cards_container.style.gap = "0px"
    cards_wrapper.style.height = "fit-content"
    pokemon_stats.style.display = "flex"
  }, 6000)
}
