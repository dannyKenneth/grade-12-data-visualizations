/**
 * Child class of lanes, father class for data points not involving currencies. Presets height changing behavior for volume
 */
class Quantities extends Lanes {
  constructor(id, csv) {
    super(idx);
    this.data = csv;
  }

  /**
   * Determines height of volume object based on magnitude
   * @param {float} val Lowest value of the volumes column
   * @param {float} maxVal Highest value of the volumes column
   * @return {void} Results are visual
   */
  calculateHeight(val, maxVal) {
    return map(float(val), 0, maxVal, 10, 200);
  }
}
