/**
 *
 */
class HandleData {
  constructor(rawData) {
    this.rawData = rawData;
    this.monthlyData = [];

    //setting defaults for mins and maxes
    this.minPrice = 0;
    this.maxPrice = 1;
    let priceRange;
    this.minVolume = 0;
    this.maxVolume = 1;
    let volumeRange;

    //initalizing ratios
    let priceRatio;
    let volumeRatio;
  }
  /**
   * Turns daily data into monthly data
   * @return {array} monthlyData The data array, but with one data point per month
   */
  filterMonthlyData() {
    for (let i = 1; i < this.rawData.length - 2; i += 30) {
      let dataRow = this.rawData[i];
      if (!isNaN(dataRow)) {
        this.monthlyData.push(dataRow);
      }
    }
    return this.monthlyData;
  }
  /**
   * Creates a set of ranges for the adjust close and volume columns
   * @return {void} Information is received through mention of a variable within the function
   */
  calculateRanges() {
    this.monthlyData = [];
    this.prices = [];
    this.volumes = [];

    for (let i = 1; i < this.rawData.length - 2; i += 30) {
      let row = this.rawData[i];

      //checking to see if the data point exists and are valid
      if (row && row.length > 5) {
        let price = parseFloat(row[1]);
        let volume = parseFloat(row[6]);

        if (!isNaN(price)) {
          price = float(price);
          this.monthlyData.push(row);
          this.prices.push(price);

          if (!isNaN(volume)) {
            volume = float(volume);
            this.volumes.push(volume);
          }
        }
      }
    }
    let newMin = Infinity; // any number greater will replace this
    let newMax = -Infinity; // any number smaller will replace this
    this.prices = this.prices.filter(
      (num) => typeof num === "number" && !isNaN(num) && isFinite(num),
    );

    //adjust close
    for (let i = 0; i < this.prices.length; i++) {
      let current = parseFloat(this.prices[i]) || 0;
      if (!isNaN(current) && isFinite(current)) {
        if (current < newMin) newMin = current;
        if (current > newMax) newMax = current;
      }
    }

    // manually checks for the minimum and maximum values for the adjust close column
    if (newMin != Infinity && newMax != -Infinity) {
      this.minPrice = newMin;
      this.maxPrice = newMax;
      if (isNaN(this.minPrice)) {
        this.minPrice = 0;
        if (isNaN(this.maxPrice)) {
          this.maxPrice = 0;
        }
      }
      this.priceRange = this.maxPrice - this.minPrice;
    }

    //volume
    for (let i = 0; i < this.volumes.length; i++) {
      let current = parseFloat(this.volumes[i]) || 0;
      if (!isNaN(current) && isFinite(current)) {
        if (current < newMin) newMin = current;
        if (current > newMax) newMax = current;
      }
    }

    // manually checks for the minimum and maximum values for the volume column
    if (newMin != Infinity && newMax != -Infinity) {
      this.minVolume = newMin;
      this.maxVolume = newMax;
      if (isNaN(this.minVolume)) {
        this.minVolume = 0;
        if (isNaN(this.maxVolume)) {
          this.maxVolume = 0;
        }
      }
      this.volumeRange = this.maxVolume - this.minVolume;
    }
  }

  /**
   * Creates the ratios and indexes for adjust close
   * @return {number} priceIndex The final index of a given data point's adjust close
   */
  createPriceIndexes(currentPrice) {
    //indexing prices from 0-9
    this.priceRatio = (currentPrice - this.priceRange) / this.priceRange;
    let priceIndex = Math.floor(priceRatio * 9);
    priceIndex = constrain(priceIndex, 0, 9);
    return priceIndex;
  }

  /**
   * Creates the ratios and indexes for volume
   * @return {number} volumeIndex The final index of a given data point's volume
   */
  createVolumeIndexes(currentVolume) {
    this.volumeRatio = (currentVolume - this.volumeRange) / this.volumeRange;
    let volumeIndex = Math.floor(volumeRatio * 9);
    volumeIndex = constrain(volumeIndex, 0, 9);
    return volumeIndex;
  }
}
