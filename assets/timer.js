let seconds=0;
let minutes=0;
let timePassed;
const timerContainer=document.getElementById("timer");
//SECOND METHOD
   function timer(){
     seconds++;
     if(seconds==60){
         seconds=0;
         minutes++;
     }
     if(seconds<10 && minutes<10)timerContainer.innerText="0"+minutes +":0"+seconds;
     else if(seconds<10) timerContainer.innerText=minutes+":0"+seconds;
     else if(minutes<10)timerContainer.innerText="0"+minutes+":"+seconds;
     else{timerContainer.innerText=minutes+":"+seconds;}
   }
    function resetSecsAndMins(){
        seconds=0;
        minutes=0;
    }