/**
 * Creates a legend box that shows the difference between particles on the roadway
 * @return {void} Results are visual
 */
function legend() {
  push();
  fill(0, 180);
  stroke(255, 30);
  rect(350, -60, 300, 200, 5);

  //title
  textAlign(LEFT);
  textFont("monospace");
  textSize(14);
  fill(225);
  text("Legend:", 375, -40);

  //legend items
  textSize(24);
  textAlign(LEFT);
  fill(255);
  text("$XX: Price", 375, 0);
  text("~~~$X.XX: Volatility", 375, 40);
  pop();
}
