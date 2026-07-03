/**
 * The grandfather class that initialzes general movement of squares. It includes setting variables, determing speed, and spawn points
 */
class VisualElement {
  constructor(x, y, csvRow, customSpeed) {
    this.x = x;
    this.y = y;
    this.csvRow = csvRow;
    this.targetX = x;
    this.targetY = y;
    this.speed = customSpeed || 0.05;
  }

  /**
   * Constantly updates the speed and direction of all particles, allowing fluid movement.
   * @return {void} All results are visual
   */
  update() {
    this.x = lerp(this.x, this.targetX, this.speed);
    this.y = lerp(this.y, this.targetY, this.speed);

    let distanceToTarget = dist(this.x, this.y, this.targetX, this.targetY);

    if (distanceToTarget < 5) {
      this.targetX = random(50, windowWidth - 50);
      this.targetY = random(80, windowHeight - 100);
    }
  }
}
