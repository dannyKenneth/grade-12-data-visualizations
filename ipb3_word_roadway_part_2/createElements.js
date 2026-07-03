let intensitySlider;

/**
 * Creates a slider that can be used to switch between years in the database easily
 * @return {void} Results are visual
 */
function createYearSlider() {
  dateSlider = createSlider(1, 7209, 0);
  dateSlider.position(50, 650);
  dateSlider.style("width", windowWidth - 100 + "px");
  dateSlider.style("height", "40px");
  let sliderText = createP("Or use slider to see general changes");
  sliderText.position(width / 2 - 120, height / 2 + 240);
  sliderText.style("color", "FFFFFF");
}

/**
 * Creates a date input section that can be used to switch between any valid day from the database (~7100 data points)
 * @return {void} Results are visual
 */
function createDateInput() {
  selectDate = createInput("", "date");
  selectDate.position(width / 2 - 175, height / 2 + 225);
  selectDate.size(350, 20);
  selectDate.style("background-color", "black");
  selectDate.style("color", "#00ff96");
  selectDate.style("border", "1px solid #ffffff");
  selectDate.style("padding", "5px");
  selectDate.style("font-family", "monospace");
  selectDate.attribute(
    "placeholder",
    "Choose a date from 1997-2024: (YYYY-MM-DD)",
  );
  selectDate.changed(validateDate);
  let dateSelectorText = createP("Select a date using the date selector below");
  dateSelectorText.position(width / 2 - 135, height / 2 + 180);
  dateSelectorText.style("color", "#FFFFFF");
}

/**
 * Creates a lightning effect using recursion and fractal mechanics, including depth and probability
 * @param {int} x x-position
 * @param {int} y y-position
 * @param {int} angle Situated angle of the lightning bolt (90deg is down)
 * @param {int} len Length of lightning bolt
 * @param {int} How many different brances can be made with the algorithm at max
 * @param {float} probability The probability of a branching section of the lightning bolt
 * @return {void} Results are visual
 */
function drawLightning(x, y, angle, len, depth, probability) {
  if (depth <= 0 || len < 2) return; // base case that will prevent function from running forever

  let x2 = x + cos(angle + random(-0.2, 0.2)) * len;
  let y2 = y + sin(angle + random(-0.2, 0.2)) * len;
  stroke(180, 200, 225, map(depth, 0, 10, 50, 225));
  line(x, y, x2, y2);

  drawLightning(x2, y2, angle, len * 0.95, depth - 1, probability);

  if (random(0, 1) < probability) {
    drawLightning(
      x2,
      y2,
      angle + random(-0.8, 0.8),
      len * 0.6,
      depth - 1,
      probability,
    );
  }
}

/**
 * Creates a visual set of circular gauges that represent the efficiencies of algorithms
 * @param {str} gauge The specific gauge being refered to, A being left, B being right
 * @return {void} Results are visual
 */
function drawHUD(gauge) {
  fill(0, 50);
  if (gauge === "A") {
    rect(-650, -300, 300, 200, 15);
  } else if (gauge === "B") {
    rect(350, -300, 300, 200, 15);
  }

  fill(255);
  textSize(18);
  textAlign(LEFT);
  if (gauge === "A") {
    text(`${statsA.name}`, -625, -260);
    textSize(14);
    text(
      `Steps Taken: ${statsA.steps} | Time: ${statsA.time} | ${statsA.complexity}`,
      -625,
      -180,
    );
  } else if (gauge === "B") {
    text(`${statsB.name}`, 375, -260);
    textSize(14);
    text(
      `Steps Taken: ${statsB.steps} | Time: ${statsB.time} | ${statsB.complexity}`,
      375,
      -180,
    );
  }
}

/**
 * Creates a search compare start button that initiates the search comparison
 * @return {void} Results are visual
 */
function createSearchButton() {
  searchButton = createButton("Run Search Comparison");
  searchButton.position(windowWidth / 2 - 175, 685);
}

/**
 * Creates a sort compare start button that initiates the sort comparison
 * @return {void} Results are visual
 */
function createSortButton() {
  sortButton = createButton("Run Sort Comparison");
  sortButton.position(windowWidth / 2 + 10, 685);
}

/**
 * Function that creates slider that controls lightning intensity
 * @return {void} Results are visual
 */
function createLightningIntensity() {
  intensitySlider = createSlider(0, 10, 5);
  intensitySlider.position(50, 600);
}
