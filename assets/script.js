//constants
const keyboard = document.getElementById("keyboard");
const createBtn = document.createElement("button");
const arrayAbc=[
"a","b","c","d","e","f","g",
"h","i","j","k","l","m",
"n","o","p","q","r","s",
"t","u","v","w","x","y","z"];
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
//functions
function btnSpawn(){
    for(let i=0;i<arrayAbc.length;i++){
        const createBtn = document.createElement("button");
        createBtn.classList.add("keyBtn");
        createBtn.innerText=arrayAbc[i];
        keyboard.appendChild(createBtn);
        createBtn.addEventListener("click",pressedBtn);
    }

}
btnSpawn();

function pressedBtn(e){
    e.target.style.visibility="hidden";
    e.target.removeEventListener("click",hideBtn);
}

function changeImage(error) {
  const imgElement = document.createElement("img");
  imgElement.src = hangmanImages[error];
  hangImg.innerHTML = imgElement;
}
