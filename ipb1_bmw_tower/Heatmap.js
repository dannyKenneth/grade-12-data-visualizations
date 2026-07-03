/**
 * used to create the colors of the heatmap
 * Primarily used as a UI enhancement class
 */
class Heatmap {
  constructor() {
    this.colorPalette = [
      "#81C4FF",
      "#65A8F0",
      "#4A8DE1",
      "#2E71D2",
      "#16588E",
      "#4B4A76",
      "#7F3C5E",
      "#B32E46",
      "#E7222E",
      "#C11A25",
    ];
  }
  /**
   * Chooses a color from the above color palette based on the index determined
   * @param {string} item The column of the dtaabase that needs tobe color coded
   * @param {array} datahandler The dataHandler class which holds the monthly data which needs to be color coded
   * @return {array} this.colorPalette[index] The color associated with the column for the database
   */
  getFillColor(item, dataHandler) {
    //find index using class metodfrom handleData
    let index = dataHandler.createPriceIndexes(price);
    return this.colorPalette[index];
  }

  /**
   * Determines the color intensity, final color, and location of a data point with two columns of data
   * @param {number} x The x position of the cell when drawn
   * @param {number} y The y position of the cell when drawn
   * @param {string} colorItem The column of the database that represents the main color shown on the heatmap
   * @param {string} intensityItem The column of the database that represents how bring the pixel will be on the heatmap
   * @return {void}
   */
  drawCell(x, y, colorItem, intensityItem, dataHandler) {
    if (colorItem == "Price") {
      this.y = map(
        price,
        dataHandler.minPrice,
        dataHandler.maxPrice,
        height,
        0,
      );
      let yIndex = dataHandler.createVolumeIndexes();
      // 4 color options for color intensity
      let intesityColor = this.colorPalette[Math.floor(yIndex / 2)];
    }
  }
}
