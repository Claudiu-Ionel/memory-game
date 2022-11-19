
const label = document.querySelector(".username-label");
const bottomScreen = document.getElementById("bottom-screen")
const labelText = "Username";
const lights = document.querySelectorAll(".inner-light");
const usernameInput = document.getElementById("user-name-input")



let typing = false;
function abortFuncExecution() {
    throw new Error("function abort")
}

export function startGame(userObj, func) {
    
    const username = usernameInput.value
    
    event.preventDefault()
    if (typing) return
    
    if (username.length === 0) return typeInText("No username", bottomScreen, 50)
    if (username.length <= 3)  return typeInText("Username too short(min 4)", bottomScreen, 50)
    userObj.UserName = username;
    func()
}
function typeInText (text, container, interval) {
    if (!typing) {
        typing = true
        container.innerText = "";
    const lettersInArray = [...text]
    
    lettersInArray.forEach((letter, index) => {
            let limit = lettersInArray.length - 1
            setTimeout(() => {
                // if (letter === " ") container.textContent = `${container.textContent} ${letter}`
                container.textContent = `${container.textContent}${letter}` 
                if (index === limit ) typing = false
            }, interval * index)
        
    })
    }
    


}

function startFlickerAnimation() {
    const interval = 200
    lights.forEach((light, index) => {
        setTimeout(() => {
            light.classList.add("flicker")
        },  interval * index)
    })
}

const pokedexCover = document.querySelector(".pokedex-cover") ;
function openPokedex() {
    if(this.classList.contains("cover-opened")) return
    this.classList.add("cover-opened")
    
         setTimeout(() => {
            typeInText(labelText, label, 100);
            startFlickerAnimation()
            
        },600)
    
    
}
pokedexCover.addEventListener("click", openPokedex)

