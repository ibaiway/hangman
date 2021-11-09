//const scoreboard = document.querySelector("aside");
 



//*IF WINS
function placeInScoreboard(currentPlayer){

    
    if(!localStorage.scoreboard){
        let playerHistoric=[];
        playerHistoric.push(currentPlayer);
        localStorage.scoreboard =JSON.stringify(playerHistoric);
    }else{
        let playerHistoric=JSON.parse(localStorage.scoreboard);
        console.log(playerHistoric);
        for (let i = 0; i < playerHistoric.length; i++) {
            if(playerHistoric[i].score>currentPlayer.score){
                playerHistoric.splice(i,0,currentPlayer);
                playerHistoric.splice(3,1);
                localStorage.scoreboard=JSON.stringify(playerHistoric);
                return;
            }
        }
        if(playerHistoric.length<3){
            playerHistoric.push(currentPlayer);
            localStorage.scoreboard=JSON.stringify(playerHistoric);
        }
    }
    
    
}