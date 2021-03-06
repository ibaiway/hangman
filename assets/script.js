//import { wordList } from "./words.js";
//constants
const keyboard = document.getElementById("keyboard");
const createBtn = document.createElement("button");
const registerPage = document.getElementById("register");
const gamePage = document.getElementById("game");
const creditPage = document.getElementById("credits");
const letterContainer = document.querySelector(".letter-container");
const currentDiv = document.getElementById("current");
const creditsContent = document.getElementsByClassName("content")[1];
const playAgainBtn = document.getElementById("playAgain");
const creditsTime = document.getElementById("creditsTime");
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
  "assets/img/hangman7.png",
  "assets/img/hangman8.png",
  "assets/img/hangman9.png"
];
let currentPlayer, currentWord, letters, lineLetters, startTime, error,timeAlready,setTime,btnSpawned=false;
let userArray = [];
let usedLetters = [];
let isWinner = true;
let contDifficult = 4;
let status = "start";

//eventListeners
//functions
//REGISTER FUNCTIONS
//Keyboard
document.addEventListener("keyup", keyboardPress);
//CLICK METHOD
document
  .getElementById("startButton")
  .addEventListener("click", validateRegister);
function validateRegister() {
  if (setName()) {
    startGame(4);
  } else {
    return false;
  }
}
function setName() {
  const nameElement = document.getElementById("name");
  if (validateName(nameElement.value)) {
    currentPlayer = createPlayer(nameElement.value);
    //TODO add name to aside
    currentDiv.innerHTML =
      "<h4>" + currentPlayer.name + "</h4><p>Currently playing...</p>";
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
  btnSpawn();
  status = "game";
  startTime = new Date();
  //TODO FIRST METHOD TIMER
  setTime=setInterval(function(){
    timeAlready=Date.now();
    timePassed=timeAlready-startTime;
    let min=Math.floor((timePassed/60000));
    let secs = Math.floor((timePassed%60000)/1000);
    if(secs<10 && min<10)timerContainer.innerText="0"+min +":0"+secs;
    else if(secs<10) timerContainer.innerText=min+":0"+secs;
    else if(min<10)timerContainer.innerText="0"+min+":"+secs;
    else{timerContainer.innerText=min+":"+secs;}
  },1000);
//*TODO SECOND METHOD TIMER
//setTime=setInterval(timer,1000);
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
    console.log(error);
    if (error == 9) {
      setTimeout(function () {
        changeToCredits(!isWinner);
      }, 300);
    }
  }
  if (userArray.toString() == letters.toString()) {
    win();
  }
}
function pressedBtn(e) {
  //Detects clicked letter
  processLetter(e.target.innerText.toLowerCase());
  console.log(e.target.innerText);
  //e.target.style.visibility = "hidden";
  //e.target.removeEventListener("click", pressedBtn);
  removeBtn(e.target);
}

function keyboardPress(event) {
  //detects physical keyboard letter
  switch (status) {
    case "game":
      const lowerCaseLetter = event.key.toLowerCase();
      if (arrayAbc.includes(lowerCaseLetter)) {
        if (!usedLetters.includes(lowerCaseLetter)) {
          processLetter(event.key.toLowerCase());
          for (let index = 0; index < keyboard.children.length; index++) {
            if (
              keyboard.children[index].innerText.toLowerCase() ==
              lowerCaseLetter
            ) {
              removeBtn(keyboard.children[index]);
            }
          }
        }
      }
      break;
    case "credits":
      if (event.key == "Enter") {
        playAgain();
        
      }
      break;

    default:
      if (event.key == "Enter") {
        validateRegister();
      }
      break;
  }
}

function removeBtn(element) {
  //removes button of a given letter element
  element.style.visibility = "hidden";
}
function btnSpawn() {
  for (let i = 0; i < arrayAbc.length; i++) {
    const createBtn = document.createElement("button");
    createBtn.classList.add("keyBtn");
    createBtn.classList.add("bouncy");
    createBtn.style.animationDelay = `${i / 15}s`;
    createBtn.innerText = arrayAbc[i];
    keyboard.appendChild(createBtn);
    createBtn.addEventListener("click", pressedBtn, { once: true });
  }
}
function changeImage(error) {
  hangImg.src = hangmanImages[error];
}
function win() {
  let endTime = new Date();
  let timePlayed = endTime - startTime;
  console.log(Math.round((timePlayed / 1000) * 10) / 10);
  currentPlayer.score = Math.round((timePlayed / 1000) * 10) / 10;
  placeInScoreboard(currentPlayer);
  setTimeout(function () {
    changeToCredits(isWinner);
  }, 700);
}

function changeToCredits(boolean) {
  //stop timer
  clearInterval(setTime);
  //*ONLY FOR SECOND METHOD TIMER
  //resetSecsAndMins();
  //This function changes the active section to the credits section
  let createH1 = document.createElement("h1");
  let nextLevelBtn = document.createElement("button");
  let createimg = document.getElementById("imgCredits");
  //if wins
  if (boolean) {
    creditsTime.innerText = "You won in " + currentPlayer.score + " seconds";
    //APPEAR NEXT LEVEL BTN
    //Condition if nextlevel button spawned, dont create more
    if(!btnSpawned){
      nextLevelBtn.classList.add("button-5");
      nextLevelBtn.innerText="Next level";
      creditsContent.appendChild(nextLevelBtn);
      btnSpawned=true;
    }
    //IF THE DIFFICULT IS SETTED TO MAX
    if(contDifficult==6){
      creditsContent.removeChild(creditsContent.lastChild)
      btnSpawned=false;
    };
    createimg.src="assets/img/win.gif";
  } else {
    //if you loss after win, remove the nextlevel bttn (and clear "YOU WIN")
    if(btnSpawned){
      creditsContent.removeChild(creditsContent.lastChild)
      creditsTime.innerText="";
      btnSpawned=false;
    };
    createH1.innerText = "GAME OVER";
    createimg.src="assets/img/loose.gif";
    creditsContent.insertAdjacentElement("afterbegin", createH1);
  }
  //add functionality to play again btn
  playAgainBtn.addEventListener("click", playAgain, { once: true });
  nextLevelBtn.addEventListener("click",function(){
    if (contDifficult < 6) {
      contDifficult++;
      playAgain();
    }
  });
  status = "credits";
  //gamepage hidden, display the credits page
  gamePage.style.display = "none";
  creditPage.style.display = "flex";
}
function playAgain() {
  //delete text h1 and game display
  deleteGameDisplay();
  //if the user wins, higher difficult
  startGame(contDifficult);
  //hide the credit page
  creditPage.style.display = "none";
}
function deleteGameDisplay() {
  // Empty usedletters array
  usedLetters = [];
  userArray = [];
  //remove msg from credits page
  creditsContent.firstChild.innerText = "";
  //remove all btns to start again
  while (keyboard.firstChild) {
    keyboard.lastChild.removeEventListener("click", pressedBtn);
    keyboard.removeChild(keyboard.lastChild);
  }
  //delete underscore of letters
  while (letterContainer.firstChild) {
    letterContainer.removeChild(letterContainer.lastChild);
  }
}
