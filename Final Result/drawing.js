function drawOnCanvas(circle, randomColor){
  // drawing code here
  //    circle(x-coordinate,y-coordinate);
    var bgColor;
    for (var i = 1; i < 7; i += 1){
      for (var j = 1; j < 5; j += 1){
      bgColor = randomColor();
      circle(60 * i,60 * j,bgColor);
      }
    }
}