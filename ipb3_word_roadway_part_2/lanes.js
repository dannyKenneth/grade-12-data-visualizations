/**
 * The primary class that calculates particle movement and speed throughout the screen
 */
class Lanes {
  constructor(idx) {
    this.idx = idx;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.dist = 0;

    let slot = this.idx % 10;
    let angles = [50, 60, 120, 130];
    this.angle = radians(angles[slot % 4]);
  }

  /**
   * Calculates initial speed and size changess to create a 3d road illusion in 2d
   * @param {float} speed The intiial speed given to the particle
   * @return {void} classwide variables are calclated and used in the future
   */
  move(speed) {
    let speedFactor = 0.005 + speed * 0.05;
    this.z += speedFactor;

    this.dist = this.z * (width * 0.5);
    this.x = this.dist * cos(this.angle);
    this.y = -200 + this.dist * sin(this.angle);

    if (this.z > 3.5) {
      this.z = 0;
    }
  }
}
