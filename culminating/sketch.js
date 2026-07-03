//------------------------------------------------------------------------
// Title: ICS Culminating Part 3
// Author: Danny Kenneth
// Date Created: May 25, 2026
// Date Modified: June 4, 2026
//------------------------------------------------------------------------

/*-------------------------------------------------------------
INITIALIZING GLOBAL VARIABLES
-------------------------------------------------------------*/
let dataNodes = [];
let rawData;
let rawArray;
let filterSlider;
let rangeBox;
let searchButton;
let sortButton;
let dataInitialized = false;
let bubbleList = [];
let insertionList = [];

/**
 * Loads important data needed to run the program before the rest of the program starts running.
 */
function preload() {
  rawData = loadTable("brain_tumor_dataset.csv", "csv", "header");
}

/**
 * Runs after the preload the function. Performs the actions listed below once before the main draw loop
 */
function setup() {
  //background setup
  createCanvas(windowWidth, windowHeight);
  background(0);
  createFilterSlider();
  createSearchButton();
  createSortButton();
  createAlgoRangeBox();

  //data loading and preperation
  if (rawData && rawData.getRowCount() > 0) {
    let totalRows = min(rawData.getRowCount(), 1000);
    rawArray = rawData.getArray();

    for (let i = 0; i < totalRows; i++) {
      let newRow = rawData.getRow(i);
      if (!newRow) continue;

      let startX = random(10, windowWidth - 20);
      let startY = random(50, windowHeight - 100);
      dataNodes.push(new GlitchEffect(startX, startY, newRow));
    }

    dataInitialized = true;
  } else {
    print("Data failed to load in time or file is empty.");
  }
}

/**
 * Code that runs repeadetly while the program is running. Acts as a program loop that keeps elements updated.
 */
function draw() {
  background(0);

  // Category Legend
  fill(255);
  textSize(13);
  text("|", 165, 30);
  text("|", 255, 30);
  text("|", 345, 30);
  text("|", 440, 30);

  fill(252, 186, 3);
  text("Oligodendroglioma", 30, 30);
  fill(122, 5, 247);
  text("Ependymoma", 175, 30);
  fill(247, 21, 5);
  text("Meningioma", 265, 30);
  fill(5, 49, 247);
  text("Astrocytoma", 355, 30);
  fill(0, 255, 150);
  text("Glioblastoma", 450, 30);

  // Input Reading Logic
  fill(255);
  let maxSquares = float(filterSlider.value());
  let rangeNum = rangeBox.value();

  if (rangeNum > 1000) {
    rangeNum = 1000;
    rangeBox.value(String(rangeNum));
  } else if (rangeNum < 1) {
    rangeNum = 1;
    rangeBox.value(String(rangeNum));
  } else if (isNaN(rangeNum)) {
    rangeNum = floor(random(1, 1000));
    rangeBox.value(String(rangeNum));
  }

  text("Filter by number: " + maxSquares, 10, windowHeight - 30);
  text("ID for algorithms: " + rangeNum, 575, windowHeight - 40);

  // geenerates the squares into the main background and runs the movement scripts
  if (dataInitialized && dataNodes.length > 0 && filterSlider) {
    let loopLimit = min(maxSquares, dataNodes.length);
    for (let i = 0; i < loopLimit; i++) {
      let node = dataNodes[i];
      if (node) {
        node.update();
        node.display();
      }
    }
  }
  // changes stress meter based on if a sort is running, and is based on speed
  if (isSorting) {
    updateSortStats(bubbleList, insertionList);
  } else {
    if (searchStressTimer > 0) {
      searchStressTimer--;
    } else {
      targetStressA = lerp(targetStressA, 0, 0.05);
      targetStressB = lerp(targetStressB, 0, 0.05);
    }
  }

  drawAlgorithmTextStats();
}
