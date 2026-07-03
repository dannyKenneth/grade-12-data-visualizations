/**
 *  Child class for volume. Determines speed, direction, and color of volume object,seperate from currency children
 */
class Volumes extends Quantities {
  constructor(csv, idx) {
    super(csv, idx);
    this.data = csv;
    this.alpha = 255;
  }

  /**
   * Displays the volume object when summoned through particles
   * @return {void} Results are visual
   */
  display() {
    if (!this.data) {
      return;
    }
    let rawVolume = this.data[6];
    let cleanVol = String(rawVolume).replace(/[^0-9.]/g, "");
    let vol = floor(cleanVol) || 0;
    let h = this.calculateHeight(vol, 10000000);
    let w = map(this.z, 0, 1, 5, 40);
    this.alpha = map(this.z, 0.1, 1, 50, 200);

    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    noStroke();
    fill(100, 150, 255, this.alpha);
    rect(0, -h, w, 5);
    fill(255, this.alpha);
    textAlign(CENTER);
    textSize(w * 0.5);
    pop();
  }
}
