import { wordList } from "./words.js";
//constants
const keyboard = document.getElementById("keyboard");
const createBtn = document.createElement("button");
const registerPage = document.getElementById("register");
const gamePage = document.getElementById("game");
const creditPage = document.getElementById("credits");
const letterContainer = document.querySelector(".letter-container");
const creditsContent = document.getElementsByClassName("content")[1];
const playAgainBtn = document.getElementById("playAgain");
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
let currentPlayer, currentWord, letters, lineLetters,startTime,error;
let userArray = [];
let usedLetters = [];
let isWinner=true;
let contDifficult=4;
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
  changeToGame();
}
function changeToGame() {
  //This function changes the active section to the game section
  //set the events listeners for the letter buttons
  //set the hangman image to step 0
  changeImage(0);
  error = 0;
  lineLetters = document.getElementsByClassName("letter");
  registerPage.style.display = "none";
  gamePage.style.display = "grid";
  document.addEventListener("keyup", keyboardPress);
  btnSpawn();
  startTime=new Date();
}
//GAME FUNCTIONS

function processLetter(letter) {
  usedLetters.push(letter);
  let letterFinded = letters.indexOf(letter);
  if (letterFinded > -1) {
    while (letterFinded != -1) {
      userArray[letterFinded] = letter;
      lineLetters[letterFinded].innerText = letter;
      letterFinded = letters.indexOf(letter, letterFinded + 1);
    }
  } else {
    error++;
    changeImage(error);
    if (error == 6) {
      document.removeEventListener("keyup", keyboardPress); 
      changeToCredits(!isWinner);
    }
  }
  if (userArray.toString() == letters.toString()) {
    win();
  }
}
function pressedBtn(e) {
  //Detects clicked letter
  processLetter(e.target.innerText);
  console.log(e.target.innerText);
  //e.target.style.visibility = "hidden";
  //e.target.removeEventListener("click", pressedBtn);
  removeBtn(e.target);
}

function keyboardPress(event) {
  //detects physical keyboard letter
  const lowerCaseLetter = event.key.toLowerCase();
  if (arrayAbc.includes(lowerCaseLetter)) {
    if (!usedLetters.includes(lowerCaseLetter)) {
      processLetter(event.key.toLowerCase());
      for (let index = 0; index < keyboard.children.length; index++) {
        if (keyboard.children[index].innerText == lowerCaseLetter) {
          removeBtn(keyboard.children[index]);
        }
      }
    }
  }
}

function removeBtn(element) {
  //removes button of a given letter element
  element.style.visibility = "hidden";
  element.removeEventListener("click", pressedBtn);
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
  hangImg.src = hangmanImages[error];
}
function win(){
  let endTime=new Date();
  let timePlayed=endTime-startTime;
  console.log(Math.round((timePlayed/1000)*10)/10);
  currentPlayer.score=Math.round((timePlayed/1000)*10)/10;
  placeInScoreboard(currentPlayer);
  changeToCredits(isWinner);
}

function changeToCredits(boolean) {
  //This function changes the active section to the credits section
  let createH1=document.createElement("h1");
  //if wins
  if(boolean){
    createH1.innerText="YOU WIN";
    creditsContent.insertAdjacentElement("afterbegin",createH1);
    if(contDifficult<6)contDifficult++;

  }else{
    createH1.innerText="GAME OVER";
    creditsContent.insertAdjacentElement("afterbegin",createH1);
  }
  //add functionality to play again btn
  playAgainBtn.addEventListener("click",playAgain);
  //gamepage hidden, display the credits page
  gamePage.style.display="none";
  creditPage.style.display="flex";
}
function playAgain(){
  //delete text h1 and game display
  deleteGameDisplay();
  //if the user wins, higher difficult
    startGame(contDifficult);
  //hide the credit page
  gamePage.style.display="grid";
  creditPage.style.display="none";
  playAgainBtn.removeEventListener("click",playAgain);

}
function deleteGameDisplay(){
    //remove msg from credits page
    creditsContent.firstChild.innerText="";
     //remove all btns to start again
     while (keyboard.firstChild) {
      keyboard.lastChild.removeEventListener("click",pressedBtn);
      keyboard.removeChild(keyboard.lastChild);
    }
    //delete underscore of letters
    while(letterContainer.firstChild){
      letterContainer.removeChild(letterContainer.lastChild);
    }
}
