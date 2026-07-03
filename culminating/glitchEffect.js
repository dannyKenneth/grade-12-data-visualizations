/**
 * The child class that determines specific movements of objects, as well as specific square divisions for grades
 */
class GlitchEffect extends DataBlock {
  constructor(x, y, csvRow) {
    super(x, y, csvRow);

    this.displayTxt = this.location;
  }

  /**
   * Determines the appropriate color for each square based on the tumor type
   * @return {void} All results are visual
   */
  getTumorColor() {
    let types = [
      "Oligodendroglioma",
      "Ependymoma",
      "Meningioma",
      "Astrocytoma",
      "Glioblastoma",
    ];
    if (this.tumorType === types[0]) return [252, 186, 3];
    if (this.tumorType === types[1]) return [122, 5, 247];
    if (this.tumorType === types[2]) return [247, 21, 5];
    if (this.tumorType === types[3]) return [5, 49, 247];
    if (this.tumorType === types[4]) return [10, 255, 50];

    return [255, 255, 255];
  }

  /**
   * Determines if the user hovered over a squqre
   * @return {float} Coordinates of the square's location
   */
  isHovered() {
    let w = floor(this.size) * 2;
    let h = floor(this.size) * 2;

    return (
      mouseX >= this.x &&
      mouseX <= this.x + w &&
      mouseY >= this.y &&
      mouseY <= this.y + h
    );
  }

  /**
   * Recursion function that divides the square into smaller squares to show the grade of the tumor
   * @param {int} x The x coordinate of the square
   * @param {int} y The y coordinate of the square
   * @param {float} currentSize The length of the square
   * @param {int} maxDepth The total amount of squares that should be created within the tumor square
   * @return {void} Only used to stop the recursion function
   */
  drawTargetDivision(x, y, currentSize, maxDepth) {
    //base function
    if (currentSize < 4) {
      return;
    }

    //second base function
    if (maxDepth <= 0) {
      return;
    }

    noFill();
    stroke(255);
    strokeWeight(0.5);
    rect(x, y, currentSize, currentSize);

    let nextSize = currentSize * 0.7;
    let offset = (currentSize - nextSize) / 2;
    this.drawTargetDivision(x + offset, y + offset, nextSize, maxDepth - 1);
  }

  /**
   * A function used in the draw lopp tpo dispplay every single square with their  movement and behavior
   * @return {void} All results are visual
   */
  display() {
    let cSize = floor(this.size) * 2;
    textSize(13);
    fill(this.getTumorColor());
    textFont("Courier New");
    rect(this.x, this.y, cSize, cSize);
    if (this.isHovered()) {
      let animatedDepth = frameCount % 15;
      this.drawTargetDivision(this.x, this.y, cSize, animatedDepth);
    }
  }
}
