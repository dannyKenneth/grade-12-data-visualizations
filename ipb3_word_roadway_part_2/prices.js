/**
 * Subclass of Lanes that determines the movement and behavior of the price tags, as well as color changes based on market trends
 */
class Prices extends Currencies {
  constructor(csv, idx) {
    super(idx, csv);
    this.data = csv;
    this.alpha = 0.1;
  }

  /**
   * Determines the start position of the particle and creates a clean linear movement that appears on the screen
   * @return {void} Results are visual
   */
  display() {
    if (!this.data) return;
    this.applyColor(year);
    this.alpha = map(this.z, 0.1, 1, 125, 255);
    let size = map(this.z, 0, 1, 2, 16);

    let price = this.data.price;

    push();
    translate(this.x, this.y);
    rotate(this.angle + 3 * HALF_PI);
    textAlign(CENTER);
    textSize(size);

    let displayPrice = this.formatVal(price);
    let finalDisplayPrice = RiTa.capitalize(displayPrice);
    text(finalDisplayPrice, 0, 0);
    pop();
  }
}
