let wrong= document.querySelector(".tries span");
let right_arrow=document.querySelector(".right-arrow");
let left_arrow=document.querySelector(".left-arrow");
//intialize local storage
localStorage.getItem('players').getItem !== null ? null :localStorage.setItem('players',JSON.stringify([["player1",100],["player2",100],["player3",100]]));
let scores = JSON.parse(localStorage.getItem('players'));
right_arrow.onclick=function(){
document.querySelector(".Players").style.left="0";
right_arrow.style.display="none";
left_arrow.style.display="flex";

}

left_arrow.onclick=function(){
document.querySelector(".Players").style.left="-200px";
left_arrow.style.display="none";
right_arrow.style.display="flex";
}

document.querySelector(".restart").onclick=function(){

matchedblocks.forEach((block)=>{
block.classList.remove('is-flipped');
})
matchedblocks=[];
document.querySelector('.victory').style.right="-100%";
wrong.textContent = 0 ;
shuffle(orderRange);
setTimeout(()=>{
blocks.forEach((block, index)=>{
block.style.order = orderRange[index];
block.addEventListener("click",flipblock);
})},duration)
}



document.querySelector(".control-button span").onclick=function(){
let Yourname = prompt("What's Your Name");
if (Yourname == null || Yourname == ""  ){
document.querySelector(".name span").innerHTML="Unknown"
}
else{
document.querySelector(".name span").innerHTML=Yourname;
}
console.log(Yourname);
document.querySelector(".control-button").remove();

}

//select the effect duration

let duration=1000;
let blocks_container=document.querySelector(".memory-game-blocks");
let blocks=Array.from(blocks_container.children);
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
topscorereintialise();
blocks.forEach((block, index)=>{
block.style.order = orderRange[index];
block.addEventListener("click",flipblock);
})


function shuffle(array) {
  let temp;
  let random;
for (let i=19;i>=0;i--){
  random = Math.floor(Math.random() * (i+1));
  temp   = array[i];
  array[i] = random;
  array[random] = temp;

}
return array;
}

let flippedblocks=[];
let matchedblocks=[];

function flipblock(){
this.classList.add("is-flipped");
  flippedblocks.push(this);
if (flippedblocks.length == 2 && matchedblocks.length < 20 ){

  blocks_container.classList.add("freez");

if (checkflippedmatch() ){
  wrong.textContent = parseInt(wrong.textContent) + 1;
  document.getElementById('error').play();
  setTimeout(()=>{
  flippedblocks[0].classList.remove("is-flipped");
  flippedblocks[1].classList.remove("is-flipped");
  flippedblocks.pop();
  flippedblocks.pop();
  blocks_container.classList.remove("freez");},duration);
}
else{
  document.getElementById('success').play();
  matchedblocks.push(flippedblocks[0]);
  matchedblocks.push(flippedblocks[1]);
  flippedblocks.pop();
  flippedblocks.pop();
  blocks_container.classList.remove("freez");
  if (matchedblocks.length == 20){
    document.getElementById('victory').play();
    document.querySelector('.victory').style.right="0";
    let winner = document.querySelector(".name span").textContent;
    for (let i=0;i<scores.length;i++){
        if (parseInt(wrong.textContent) < scores[i][1]){
            scores.splice(i,0,[winner,parseInt(wrong.textContent)]);
            scores.pop();
            break;
        }
    }

    topscorereintialise()
    //save new scores to local storage
    localStorage.setItem("players",JSON.stringify(scores));
  }

}
}
}


function checkflippedmatch(){
return flippedblocks[0].getAttribute('data-tech')!= flippedblocks[1].getAttribute('data-tech');}

function topscorereintialise(){
for (let i=0;i<scores.length;i++){
document.querySelector(`ul.scores li:nth-of-type(${i + 2}) span.username`).textContent  = scores[i][0];
document.querySelector(`ul.scores li:nth-of-type(${i + 2}) span.score`).textContent = scores[i][1];
}
}