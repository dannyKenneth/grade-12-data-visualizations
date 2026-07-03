/**
 * The primary class that converts table data into a usuable array object
 */
class HandleData {
  constructor(data) {
    this.data = data.getArray();
    this.dates = [];
    this.prices = [];
    this.volumes = [];
    this.highLows = [];
  }

  /**
   *  Parses (Analyzes by parts) all data rows and determines the respective values of date, price, volume, and volatility
   * @return {void} sets classwide variables for future use
   */
  parseData() {
    for (let i = 1; i < this.data.length - 2; i++) {
      let row = this.data[i];
      //dates
      this.dates.push(row[0]);
      //prices
      let close = float(row[2]);
      this.prices.push(close);
      //volumes
      let volume = float(row[6]);
      this.volumes.push(volume);
      //volatility
      let high = float(row[3]);
      let low = float(row[4]);
      this.highLows.push(high - low);
    }
  }
  /**
   * Takes all values from an index and returns it as a structured object
   * @param {int} index The index of which the extracted data is from in the data table
   * @return {object} list of values useful for the program
   */
  getMarketTrend(index) {
    return {
      date: this.dates[index],
      price: this.prices[index],
      volume: this.volumes[index],
      volatility: this.highLows[index],
    };
  }
}
