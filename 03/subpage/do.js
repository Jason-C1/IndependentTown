var holes = [
[{x:"130px", y:"170px"}, {x:"322px", y:"170px"}, {x:"516px", y:"170px"}],
[{x:"106px", y:"262px"}, {x:"322px", y:"262px"}, {x:"522px", y:"262px"}],
[{x:"97px", y:"362px"}, {x:"322px", y:"362px"}, {x:"544px", y:"362px"}],
];
var game = {
  score:0,
  time:10,
  timer:setInterval(function(){
      if(game.time<=0){
        var main = document.getElementById("main");
        var mouses = main.getElementsByTagName("span");
        for(var index=0;index<mouses.length;index++){
          clearTimeout(mouses[index].timer);
          mouses[index].className = "mouse hide";
          mouses[index].hid = true;
        }
        console.log(game.timer);
        clearInterval(game.timer);
        main.innerHTML +="<div id='game-ending'>game ending</div>"
      }
      var timeBox = document.getElementById("time");
      timeBox.innerHTML=game.time;
      game.time--;
    },1000),
}
window.onload = function(){
  var main = document.getElementById("main");
  for(var i=0;i<9;i++){
    main.innerHTML += '<span id="mouse'+i+'" class="mouse normal"></span>'
  }
  var mouses = main.getElementsByTagName("span");
  for(var index=0;index<mouses.length;index++){
    var col = index%3;
    var row = parseInt(index/3);
    mouses[index].showTimeInc = 10000;
    mouses[index].showTime = 0;
    mouses[index].hideTime = 5000;
    mouses[index].onmouseover = mouseOver;
    mouses[index].onmouseout = mouseOut;    
    mouses[index].onclick = mouseHit;
    mouses[index].randomShow = randomShow;
    mouses[index].timingHide = timingHide;
    mouses[index].style.left = holes[row][col].x;
    mouses[index].style.top = holes[row][col].y;
    mouses[index].className = "mouse hide";
    mouses[index].hid = true;
    mouses[index].randomShow();
  }
};
function randomShow(){
  if(!this.hid){
    return;
  }
  this.timer = setTimeout(e =>{
    this.hitted = false;
    this.hid=false;
    this.className = "mouse normal";
    clearTimeout(this.timer);
    this.timingHide();
  }, this.showTime+this.showTimeInc*Math.random()); 
}
function timingHide(){
  if(this.hitted || this.hid){
    return;
  }
  this.timer = setTimeout(e =>{
    this.hid = true;
    this.className = "mouse hide";
    clearTimeout(this.timer);
    this.randomShow();
  }, this.hideTime); 
}
function mouseOver(){
  if(!this.hitted && !this.hid){
    this.className = "mouse over";
  }
}

function mouseOut(){
  if(!this.hitted &&  !this.hid){
    this.className = "mouse normal";
  }
}

function mouseHit(){
  if(this.hitted || this.hid){
    return;
  }
  this.className = "mouse hit";
  this.hitted = true; //flag
  var count = document.getElementById("count");
  var x = parseInt(this.style.left);
  count.style.left = (x+36) + "px";
  count.style.top = this.style.top;
  count.style.display = "block";
  game.score++;
  var score = document.getElementById("score");
  score.innerHTML=game.score;
  this.timer = setTimeout( e => {
    this.hid = true;

    this.className = "mouse hide";
    count.style.display = "none";
    clearTimeout(this.timer);
    this.randomShow();
  }, 500);
}
