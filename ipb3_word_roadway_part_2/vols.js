/**
 * Subclass of Lanes that determines the movement and behavior of the volatility tags, as well as color changes based on market trends
 */

class Vols extends Currencies {
  constructor(csv, idx) {
    super(idx);
    this.data = csv;
  }

  /**
   * Determines the start position of the particle and creates a jittery linear movement that appears on the screen
   * @return {void} Results are visual
   */
  display() {
    let alpha = map(this.z, 0, 1, 0, 150);
    this.applyColor(year);
    let volatility = this.data.volatility.toFixed(2);

    push();
    translate(this.x, this.y);
    this.angle += random(-0.01, 0.01);
    rotate(this.angle + 3 * HALF_PI);
    strokeWeight(2);
    stroke(255, alpha);

    let displayVol = this.formatVal(volatility);
    text(displayVol, 0, 0);
    pop();
  }
}
