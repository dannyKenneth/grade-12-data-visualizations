/**
 * Child class of lanes, father class for data points involving currencies. Presets formatting and color changes based on market mood
 */
class Currencies extends Lanes {
  constructor(idx, csv) {
    super(idx);
    this.data = csv;
    this.symbol = "$";
  }
  /**
   * Formats to currency
   * @param {float} num Number to convert
   * @return Number with new symbol as a string
   */
  formatVal(num) {
    return this.symbol + float(num).toFixed(2);
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
