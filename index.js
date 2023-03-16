let wrong= document.querySelector(".tries span");
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
console.log(blocks);
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);
console.log(orderRange);

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

function flipblock(){
this.classList.add("is-flipped");
flippedblocks.push(this);
if (flippedblocks.length == 2){

blocks_container.classList.add("freez");

if (checkflippedmatch()){
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
  flippedblocks.pop();
  flippedblocks.pop();
  blocks_container.classList.remove("freez");
}
}
}


function checkflippedmatch(){
return flippedblocks[0].getAttribute('data-tech')!= flippedblocks[1].getAttribute('data-tech');}
