const scoreboard = document.getElementById("scoreboard");
//When loading the window it gets the score stored and shows them in the aside
window.addEventListener("load", loadScoreboard);
//*IF WINS
function placeInScoreboard(currentPlayer) {
  if (!localStorage.scoreboard) {
    let playerHistoric = [];
    playerHistoric.push(currentPlayer);
    localStorage.scoreboard = JSON.stringify(playerHistoric);
    loadScoreboard();
  } else {
    let playerHistoric = JSON.parse(localStorage.scoreboard);
    console.log(playerHistoric);
    for (let i = 0; i < playerHistoric.length; i++) {
     
      if(playerHistoric[i].score > currentPlayer.score){
        playerHistoric.splice(i, 0, currentPlayer);
        playerHistoric.splice(3, 1);
        localStorage.scoreboard = JSON.stringify(playerHistoric);
        loadScoreboard();
        return;
      }
    }
    if (playerHistoric.length < 3) {
      playerHistoric.push(currentPlayer);
      localStorage.scoreboard = JSON.stringify(playerHistoric);
      loadScoreboard();
    }
  }
}

function loadScoreboard() {
  let playerHistoric = JSON.parse(localStorage.scoreboard);
  let position=1;
  scoreboard.textContent = "";
  playerHistoric.forEach((element) => {
    console.log(element);
    let newName = document.createElement("h4");
    newName.innerText = position+"º. "+element.name;
    let newScore = document.createElement("p");
    newScore.innerText = element.score + " seconds";
    scoreboard.appendChild(newName);
    scoreboard.appendChild(newScore);
    position++
  });
}
