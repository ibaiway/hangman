import { wordList } from "./words.js";
//constants
const keyboard = document.getElementById("keyboard");
const createBtn = document.createElement("button");
const registerPage = document.getElementById("register");
const gamePage = document.getElementById("game");
const creditPage = document.getElementById("credits");
const letterContainer = document.querySelector(".letter-container");
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
let currentPlayer,currentWord,letters,lineLetters;
let userArray=[];
let error=0;
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
  letters = currentWord.split("");
  letters.forEach((element) => {
    let letterDiv = document.createElement("div");
    letterDiv.classList = "letter";
    letterContainer.appendChild(letterDiv);
  });
  console.log(letters);
  console.log(currentWord);
  changeImage(0);
  lineLetters = document.getElementsByClassName("letter");
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
    let letterFinded=letters.indexOf(e.target.innerText)
    if(letterFinded>-1){
        while(letterFinded!=-1){
            userArray[letterFinded]=e.target.innerText;
            lineLetters[letterFinded].innerText=e.target.innerText;
            letterFinded=letters.indexOf(e.target.innerText, letterFinded+1); 
        }
    }else{
        error++;
        changeImage(error);
        if(error==6){
            alert("HAS PERDIDO, METE UN LEURO");
        }
    }
        if(userArray.toString()==letters.toString()){
            alert("HAS GANADO");
        }
    
  e.target.style.visibility = "hidden";
  e.target.removeEventListener("click", pressedBtn);
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
  hangImg.innerHTML = "<img src='"+hangmanImages[error]+"' alt='hangman'>";
}
function changeToCredits() {
  //This function changes the active section to the credits section
}
