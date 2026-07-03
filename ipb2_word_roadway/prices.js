/**
 * Subclass of Lanes that determines the movement and behavior of the price tags, as well as color changes based on market trends
 */
class Prices extends Lanes {
  constructor(csv, idx) {
    super(idx);
    this.data = csv;
    this.alpha = 0.1;
  }

  /**
   * Determines the start position of the particle and creates a clean linear movement that appears on the screen
   * @return {void} Results are visual
   */
  display() {
    if (!this.data) return;

    this.alpha = map(this.z, 0.1, 1, 125, 255);
    let size = map(this.z, 0, 1, 2, 16);

    let price = this.data.price;

    push();
    translate(this.x, this.y);
    rotate(this.angle + 3 * HALF_PI);
    textAlign(CENTER);
    textSize(size);

    let displayPrice = "$" + int(price);
    let finalDisplayPrice = RiTa.capitalize(displayPrice);
    text(finalDisplayPrice, 0, 0);
    pop();
  }

  /**
   * Applies a color based on the market trend
   * @param {string} year A substring from the date column of the data table used to determine the current state of the market
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
