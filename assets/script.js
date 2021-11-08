import { wordList } from "./words.js";
//constants
const keyboard = document.getElementById("keyboard");
const createBtn = document.createElement("button");
const registerPage = document.getElementById("register");
const gamePage = document.getElementById("game");
const creditPage = document.getElementById("credits");
const arrayAbc = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const hangImg = document.getElementById("hangImg");
const hangmanImages = [
  "assets/img/hangman0.png",
  "assets/img/hangman1.png",
  "assets/img/hangman2.png",
  "assets/img/hangman3.png",
  "assets/img/hangman4.png",
  "assets/img/hangman5.png",
  "assets/img/hangman6.png",
];
let currentPlayer;
let currentWord;
//eventListeners
//functions
//REGISTER FUNCTIONS
document.getElementById("startButton").addEventListener("click", () => {
  if (setName()) {
    startGame(4);
  } else {
    return false;
  }
});

function setName() {
  const nameElement = document.getElementById("name");
  if (validateName(nameElement.value)) {
    currentPlayer = createPlayer(nameElement.value);
    //TODO add name to aside
    return true;
  } else {
    alert("El nombre no cumple las reglas");
    //TODO logica de mostrar error de nombre al usuario
    return false;
  }
}
function validateName(value) {
  if (value.indexOf(" ") >= 0 || value.length < 1 || value.length > 10) {
    return false;
  } else {
    return true;
  }
}
//object
function createPlayer(name, score = 0) {
  return {
    name: name,
    score: score,
  };
}
function startGame(difficulty) {
  // Change section -> set hangman Image to step 0 -> errors = 0 -> get a word from words array
  // gets value difficulty, depending on this we will take a more difficult word.
  currentWord =
    wordList[difficulty][
      Math.floor(Math.random() * wordList[difficulty].length)
    ];
  const letters = currentWord.split("");
  console.log(letters);
  console.log(currentWord);
  registerPage.style.display = "none";
  gamePage.style.display = "grid";
  btnSpawn();
}
function changeToGame() {
  //This function changes the active section to the game section
  //set the events listeners for the letter buttons
  //set the hangman image to step 0
}
//GAME FUNCTIONS
function pressedBtn(e) {
  e.target.style.visibility = "hidden";
  e.target.removeEventListener("click", hideBtn);
}
function btnSpawn() {
  for (let i = 0; i < arrayAbc.length; i++) {
    const createBtn = document.createElement("button");
    createBtn.classList.add("keyBtn");
    createBtn.innerText = arrayAbc[i];
    keyboard.appendChild(createBtn);
    createBtn.addEventListener("click", pressedBtn);
  }
}
function changeImage(error) {
  const imgElement = document.createElement("img");
  imgElement.src = hangmanImages[error];
  hangImg.innerHTML = imgElement;
}
function changeToCredits() {
  //This function changes the active section to the credits section
}
