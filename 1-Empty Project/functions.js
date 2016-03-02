(function(){

var canvas = document.getElementById('my-canvas');
var ctx = canvas.getContext('2d');

function circle(x,y,color){

  var fillColor = "#268bd2";
  if (color !== undefined){
    fillColor = color;
  }
  var circ = new Path2D();
    ctx.fillStyle = fillColor;
    circ.moveTo(125,35);
    circ.arc(x, y, 25, 0, 2 * Math.PI); // x and y should be multiples of 60
    ctx.fill(circ);
}
function randomColor(){
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

if (canvas.getContext){

  window.drawOnCanvas(circle,randomColor);

} else {
  console.log("Your browser does not support canvas!");
}
})();