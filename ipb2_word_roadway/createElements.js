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
