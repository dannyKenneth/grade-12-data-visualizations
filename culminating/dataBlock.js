/**
 * The father class that stores important information for each square, givign it'sunique behavior and movement
 */
class DataBlock extends VisualElement {
  constructor(x, y, csvRow) {
    let rawAge = int(csvRow.getString("Patient Age"));
    let calculatedSpeed = map(rawAge, 0, 100, 0.05, 0.01);
    super(x, y, csvRow, calculatedSpeed);

    this.location = csvRow.getString("Location");
    this.tumorType = csvRow.getString("Tumor Type");
    this.tumorGrade = csvRow.getString("Grade");
    this.age = rawAge;
    this.size = float(csvRow.getString("Size (cm)")) || 2;

    this.growthRate = 0;
    this.grade = 0;
    this.dtermineGrowthRate();
  }

  /**
   * Determines the grade of a tumor through conversion from a string based label to a number
   * @return {void} All results are visual
   */
  dtermineGrowthRate() {
    if (this.tumorGrade === "I") {
      this.grade = 1;
    } else if (this.tumorGrade === "II") {
      this.grade = 2;
    } else if (this.tumorGrade === "III") {
      this.grade = 3;
    } else if (this.tumorGrade === "IV") {
      this.grade = 4;
    }

    this.growthRate = this.grade * 1.5;
  }
}
