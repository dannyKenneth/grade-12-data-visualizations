/**
 * Creates the slider used for filtering
 * @return {void} Result is visual
 */
function createFilterSlider() {
  filterSlider = createSlider(1, 1000, 1000);
  filterSlider.position(10, windowHeight - 20);
  filterSlider.size(200);
}

/**
 * Creates the button to initiate searching algorithms
 * @return {void} Result is visual
 */
function createSearchButton() {
  searchButton = createButton("Run Search Comparison");
  searchButton.position(230, windowHeight - 35);
  searchButton.mousePressed(triggerSearchEvent);
}

/**
 * Creates the button used to initiate sorting algorithms
 * @return {void} Result is visual
 */
function createSortButton() {
  sortButton = createButton("Run Sort Comparison");
  sortButton.position(400, windowHeight - 35);
  sortButton.mousePressed(triggerSortEvent);
}

/**
 * Creates the input box used to store the id for searching
 * @return {void} Result is visual
 */
function createAlgoRangeBox() {
  // Fix: Call createInput() completely empty, then set its value on the next line!
  rangeBox = createInput();
  rangeBox.value("603");
  rangeBox.position(575, windowHeight - 30);
}

/**
 * Event funcction that runs when the search button is pressed
 * @return {void} Result is visual
 */
function triggerSearchEvent() {
  if (!dataNodes || dataNodes.length === 0) return;

  isSorting = false; // Intercept any active sorting runs
  let dataList = [];

  for (let node of dataNodes) {
    if (!node) continue;

    let patientID = String(node.id).trim();
    let tumorSize = node.size;

    dataList.push([patientID, tumorSize]);
  }

  let targetID = rangeBox.value().trim();

  compareSearch(dataList, targetID);
}

/**
 * Event funcction that runs when the sort button is pressed
 * @return {void} Result is visual
 */
function triggerSortEvent() {
  if (!dataNodes || dataNodes.length === 0) return;

  bubbleList = [];
  insertionList = [];

  for (let node of dataNodes) {
    if (!node) continue;

    let patientID = String(node.id).trim();
    let tumorSize = node.size;

    bubbleList.push([patientID, tumorSize]);
    insertionList.push([patientID, tumorSize]);
  }

  startSortRace();
}

/**
 * Displays the algoruthm run times, and other important stats about the algorithm
 * @return {void} Result is visual
 */
function drawAlgorithmTextStats() {
  let startX = 50;
  let startY = windowHeight - 90;

  textFont("Courier New");
  noStroke();

  textSize(13);
  fill(252, 186, 3);
  text(
    "> " + statsA.name.toUpperCase() + " [" + statsA.complexity + "]",
    startX,
    startY,
  );

  fill(220);
  textSize(11);
  text("Operations: " + statsA.steps, startX + 15, startY + 18);
  text("Exec Time:  " + statsA.time + " ms", startX + 15, startY + 32);

  let startX_B = startX + 200;

  textSize(13);
  fill(0, 255, 150);
  text(
    "> " + statsB.name.toUpperCase() + " [" + statsB.complexity + "]",
    startX_B,
    startY,
  );

  fill(220);
  textSize(11);
  text("Operations: " + statsB.steps, startX_B + 15, startY + 18);
  text("Exec Time:  " + statsB.time + " ms", startX_B + 15, startY + 32);
}
