//initializing variables
let angleA = 135;
let angleB = 135;
let velocityA = 0;
let velocityB = 0;
let stressA = 0;
let stressB = 0;
let targetAngle = 225;

/**
 * Displays a circle where the gauge will be
 * @param {int} x x-position
 * @param {int} y y-position
 * @return {void} Results are visual
 */
function displaySpeedometer(x, y) {
  fill(0, 180);
  stroke(255, 30);
  circle(x, y, 280);
}

/**
 * Changes the acceleration of the gauge needle
 * @param {int} targetStress The value coresponding to how inefficient an algorithm is
 * @return {void} Results are visual
 */
function updateNeedlePos(targetStress) {
  targetAngle = map(targetStress, 0, 100, 135, 405);
  let distance = targetAgle - needleAngle;
  needleVelocity = distance * 0.05;
  needleAngle += needleVelocity;

  if (targetStress > 80) {
    needleAngle += random(-1.5, 1.5);
  }
}

/**
 * Creates a needle that rotates like a speedometer
 * @param {str} gauge The gauge being refered to, A being left, B being right
 * @param {int} x x-position
 * @param {int} y y-position
 * @return {void} Results are visual
 */
function drawNeedle(gauge, x, y) {
  push();
  translate(x, y);
  if (gauge === "A") {
    rotate(radians(angleA));
  } else if (gauge === "B") {
    rotate(radians(angleB));
  }
  stroke(255, 0, 0);
  strokeWeight(4);
  line(0, 0, 120, 0);

  //centre point for needle to rotate around
  fill(50);
  ellipse(0, 0, 10, 10);

  if (gauge === "A") {
    if (targetStressA > 10) {
      let pA = map(targetStressA, 0, 100, 0, 0.5);

      // lightning layer 1
      strokeWeight(6);
      stroke(100, 150, 255, 50);
      drawLightning(60, 0, 0, 18, 10, pA);

      //lightning layer 2
      strokeWeight(3);
      stroke(150, 255, 255, 150);
      drawLightning(60, 0, 0, 16, 10, pA);

      //lightning layer 3
      strokeWeight(1);
      stroke(255);
      drawLightning(60, 0, 0, 15, 10, pA);
    } else if (gauge == "B") {
      if (targetStressA > 10) {
        let pB = map(targetStressB, 0, 100, 0, 0.5);

        // lightning layer 1
        strokeWeight(6);
        stroke(100, 150, 255, 50);
        drawLightning(60, 0, 0, 18, 10, pB);

        //lightning layer 2
        strokeWeight(3);
        stroke(150, 255, 255, 150);
        drawLightning(60, 0, 0, 16, 10, pB);

        //lightning layer 3
        strokeWeight(1);
        stroke(255);
        drawLightning(60, 0, 0, 15, 10, pB);
      }
    }
  }
  pop();
}

/**
 * Updates gauge angles and smoothens animations using linear interpolation
 * @return {void} Results are visual
 */
function updateGauges() {
  let targetA = map(targetStressA, 0, 100, 135, 405);
  angleA = lerp(angleA, targetA, 0.1);
  let targetB = map(targetStressB, 0, 100, 135, 405);
  angleB = lerp(angleB, targetB, 0.1);
}
