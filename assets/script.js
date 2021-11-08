//constants
const keyboard = document.getElementById("keyboard");
const createBtn = document.createElement("button");
const arrayAbc=[
"a","b","c","d","e","f","g",
"h","i","j","k","l","m",
"n","o","p","q","r","s",
"t","u","v","w","x","y","z"];
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
    console.log("paso");
}