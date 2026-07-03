/*-------------------------------------------------------------
INITIALIZING GLOBAL VARIABLES
-------------------------------------------------------------*/
let rawData;
let loadedData;
let ui;
let data;
let needsRefresh = false;
let isHovering = false;
let cellHitboxes = [];
let cellWidth = 20;
let cellHeight = 20;
let grilleHeight = 1000;
let numPixelsPerBar = 17;

/**
 * Loads important data needed to run the program before the rest of the program starts running.
 */
function preload() {
  return (rawData = loadStrings("BMW_Data.csv", testSuccess));
}

/**
 * Used as a visual indicator in the console to determine if the database data has been fetched correctly.
 */
function testSuccess() {
  console.log("Success!");
}

/**
 * Code within this function run once at the beginning of the program. Used to set up important elements of the program.
 */
function setup() {
  //Initializing graphics variables
  createCanvas(windowWidth, windowHeight, WEBGL);
  middleText = createGraphics(500, 500);
  translate(-windowWidth / 2, -windowHeight / 2);
  background(0);
  loadedData = rawData.map((line) => {
    return line.split(",");
  });
  // setting up data handler
  data = new HandleData(loadedData);
  data.calculateRanges();

  // setting up heatmap
  ui = new Heatmap();
  needsRefresh = true;
}
/**
 * Code that runs repeadetly while the program is running. Acts as a program loop that keeps elements updated.
 */
function draw() {
  middleText.clear();
  isHovering = false;
  background(0);
  needsRefresh = true;

  //-----------------------------------------------------------------
  // Code that runs whenever the kidney grill heatmap needs to update
  //-----------------------------------------------------------------
  if (needsRefresh) {
    let loadedMonthlyData = data.filterMonthlyData();
    let current = 0;
    let currentBar = 1;
    cellHitboxes = [];
    metalicNoise = random(0.7, 0.8);
    //creating background kidney grille (icomic bmw front)
    drawingContext.shadowColor = 255;
    drawingContext.shadowBlur = 30;
    drawingContext.shadowOffset = 7;
    fill(metalicNoise);
    stroke(255);
    rectMode(CORNER);
    rotateY(radians(0));
    // Two outlines for grilles
    rect(-235, -275, cellWidth * 7.5, cellHeight * 17.5, 15);
    rect(105, -275, cellWidth * 7.5, cellHeight * 17.5, 15);

    // --------------------------------------------------------------------
    // HEATMAP POPULATION LOOP
    // Draws monthly data as a heatmap in the shape of BMW kidney grilles
    // --------------------------------------------------------------------
    for (
      let col = 0;
      col < floor(loadedMonthlyData.length / numPixelsPerBar);
      col++
    ) {
      let currentPrice = float(loadedMonthlyData[current][1]);
      let currentVolume = float(loadedMonthlyData[current][6]);

      // vertical loop to create stacked heatmap
      for (let vert = 0; vert < numPixelsPerBar; vert++) {
        // setting x and y variables for location and translation
        let x = currentBar * cellWidth - 250;
        let y = grilleHeight - vert * cellHeight - 950;

        let centreX = x + (cellWidth - 5) / 2;
        let centreY = y + (cellHeight - 5) / 2;

        //determining hitboxes for each pixel
        cellHitboxes.push({
          x: centreX,
          y: centreY,
          data: loadedMonthlyData[current],
        });

        //calculating value represented by the square pixel
        let cellPrice =
          data.minPrice + (vert * data.priceRange) / numPixelsPerBar;

        //creating noise factors
        noiseFactor = random(0.97, 1.03);
        brightnessPercent = random(0.95, 1.05);
        grain = random(-5, 5);

        // determining ratios and adding blending based on red and blue
        let priceRatio = (cellPrice - data.minPrice) / data.priceRange;
        let volumeRatio = (currentVolume - data.minVolume) / data.volumeRange;

        //setting rgb colors based on the ratios and noise
        let r = volumeRatio * 255 * noiseFactor;
        let g = 0;
        let b = priceRatio * 255 * noiseFactor;

        //adding subtle blur to make data pop
        drawingContext.shadowColor = (r, 0, b);
        drawingContext.shadowBlur = 3;

        fill(
          constrain(r * brightnessPercent + grain, 0, 255),
          g,
          constrain(b * brightnessPercent + grain, 0, 255),
        );
        noStroke();
        rect(x, y, cellWidth - 0.75, cellWidth - 0.75);

        //resetting blur effect to 0
        drawingContext.shadowBlur = 0;
        current++;
      }
      currentBar += 1;
      if (currentBar == 8) {
        currentBar = 18;
      }
    }
    needsRefresh = false;
  }

  //------------------------------------------------
  //HOVER EFFECT CODE
  //------------------------------------------------
  if (cellHitboxes.length > 0) {
    // creating the text to show stats
    middleText.fill(255);
    middleText.noStroke();
    middleText.textFont("Orbitron");
    middleText.textSize(16);
    middleText.textAlign(CENTER, CENTER);

    // Draws out text for a specific data pixel in the
    for (let pixel of cellHitboxes) {
      let distance = dist(
        mouseX - width / 2,
        mouseY - height / 2,
        pixel.x,
        pixel.y,
      );
      if (distance < cellWidth) {
        middleText.text("Date: " + pixel.data[0], 250, 40);
        middleText.text("Adj. Close: " + pixel.data[1], 250, 80);
        middleText.text("Close: " + pixel.data[2], 250, 120);
        middleText.text("High: " + pixel.data[3], 250, 160);
        middleText.text("Low: " + pixel.data[4], 250, 200);
        middleText.text("Open: " + pixel.data[5], 250, 240);
        middleText.text("Volume: " + pixel.data[6], 250, 280);
        middleText.text(
          "Based On: Adj. Price - Color\nVolume Color - Intensity",
          250,
          320,
        );
        isHovering = true;
        break;
      }
    }
    // only draws text when mouse is on an active pixel representing data
    if (isHovering) {
      push();
      translate(0, 0, 100);
      texture(middleText);
      noStroke();
      plane(400, 400);
      pop();
    }
  }
}
