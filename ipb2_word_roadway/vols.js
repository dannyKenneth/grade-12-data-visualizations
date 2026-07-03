/**
 * Subclass of Lanes that determines the movement and behavior of the volatility tags, as well as color changes based on market trends
 */

class Vols extends Lanes {
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
    let volatility = this.data.volatility.toFixed(2);

    push();
    translate(this.x, this.y);
    this.angle += random(-0.01, 0.01);
    rotate(this.angle + 3 * HALF_PI);
    strokeWeight(2);
    stroke(255, alpha);

    let displayVol = "$" + volatility;
    text(displayVol, 0, 0);
    pop();
  }

  /**
   * Applies a color based on the market trend
   * @return {void} Results are visual
   */
  applyColor(year) {
    if (["1997", "1999", "2012", "2021", "2023"].includes(year)) {
      fill(0, 255, 150, this.alpha);
    } else if (
      ["2002", "2004", "2008", "2009", "2020", "2024"].includes(year)
    ) {
      fill(200, 50, 50, this.alpha);
    } else {
      fill(255, this.alpha);
    }
  }
}
