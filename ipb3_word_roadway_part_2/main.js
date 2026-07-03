//------------------------------------------------------------------------
// Title: IPB3 - Word Roadway
// Author: Danny Kenneth
// Date Created: May 8, 2026
// Date Modified: May 11, 2026
//------------------------------------------------------------------------

/*-------------------------------------------------------------
INITIALIZING GLOBAL VARIABLES
-------------------------------------------------------------*/
let wordnik;
let apiKey = "ctwxjm9sjknmo1gpmkl04aqpocyr883z58clt86mttbaixso0";
let car;
let current = "";
let idx;
let lastMarketTrend = "BUY";
let dataManager;
let targetStress = 0;
let dateSlider;
let year;
let lastIdx = -1;
let searchButtonPressed = false;
let sortButtonPressed = false;
let rawData;
let listedData;
let customDate = "";
let particles = [];
let lIntensity;
let climbList = [
  "Ascent",
  "Surge",
  "Rally",
  "Expansion",
  "Upturn",
  "Progress",
  "Peak",
  "Gain",
  "Boost",
  "Inflation",
  "Thrive",
  "Advance",
  "Climb",
  "Elevate",
  "Success",
  "Skyrocket",
  "Explosion",
  "Parabolic",
  "Outperformance",
  "Dominance",
  "Velocity",
  "Breakout",
  "Moonshot",
  "Prosperity",
  "Euphoria",
  "Momentum",
  "Windfall",
  "Robust",
  "Aggressive",
  "Unstoppable",
  "Bullish",
  "Appreciation",
  "Accumulation",
  "Liquidity",
  "Speculation",
  "Recovery",
  "Stability",
  "Valuation",
  "Dividend",
  "Capitalization",
  "Yield",
  "Profitability",
  "Margin",
  "Optimization",
  "Inflow",
];
let fallList = [
  "Decline",
  "Dip",
  "Drop",
  "Slide",
  "Slump",
  "Retraction",
  "Correction",
  "Decrease",
  "Erosion",
  "Weakness",
  "Contraction",
  "Recession",
  "Low",
  "Bottom",
  "Deflation",
  "Plummet",
  "Plunge",
  "Collapse",
  "Freefall",
  "Meltdown",
  "Catastrophe",
  "Panic",
  "Liquidation",
  "Bloodbath",
  "Volatility",
  "Nosedive",
  "Tumble",
  "Correction",
  "Underperformance",
  "Capitulation",
  "Bearish",
  "Depreciation",
  "Divestment",
  "Volatility",
  "Shorting",
  "Downtrend",
  "Resistance",
  "Stagnation",
  "Outflow",
  "Liability",
  "Deficit",
  "Underweight",
  "Correction",
  "Bear-Trap",
  "Sell-off",
];
let sentiment;

/**
 * Loads important data needed to run the program before the rest of the program starts running.
 */
function preload() {
  fire = loadImage("./fire.gif");
  car = loadImage("car.png");
  rawData = loadTable("BMW_Data.csv");
}

/**
 * Code within this function run once at the beginning of the program. Used to set up important elements of the program.
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  dataManager = new HandleData(rawData);
  dataManager.parseData();
  listedData = rawData.getArray();
  bubbleList = listedData.slice();
  insertionList = listedData.slice();

  //setting up wordnik
  wordnik = new WordnikApi(apiKey);

  //setting up the date slider
  createYearSlider();

  //sestting up personal date date input
  createDateInput();

  ///setting up search comparison button
  createSearchButton();
  searchButton.mousePressed(() => {
    searchButtonPressed = true;
  });

  //setting up intensity sliderr for recursion lightning
  lIntensity = createP("Adjust Recursion Lightning Depth");
  createLightningIntensity();

  //setting up sort comparison button
  createSortButton();
  sortButton.mousePressed(() => {
    sortButtonPressed = true;
  });

  //creating initial lane words
  for (let i = 0; i < 4; i++) {
    let csvRow = rawData.getRow(i);
    particles.push(new Prices(csvRow, i));
  }
}

/**
 * Code that runs repeadetly while the program is running. Acts as a program loop that keeps elements updated.
 */
function draw() {
  background(0);
  translate(windowWidth / 2, windowHeight / 2);

  /*-------------------------------------------------------------
DETERMINING DATA INDEX AND WORD DATA
-------------------------------------------------------------*/
  idx = dateSlider.value();

  //checking to see if the slider index changed to trigger the wordnik word fetching
  if (idx !== lastIdx) {
    lastIdx = idx;
    let todayPrice = float(rawData.getArray()[idx][1]);
    let yesterdayPrice = float(rawData.getArray()[idx - 1][1]);
    if (todayPrice >= yesterdayPrice) {
      lastMarketTrend = "BUY";
      sentiment = climbList[floor(random(climbList.length))];
    } else {
      lastMarketTrend = "SELL";
      sentiment = fallList[floor(random(fallList.length))];
    }

    wordnik.getMarketAnalysis(sentiment);
  }

  //changing the particles if the custom date changes
  if (customDate) {
    let searchIdx = extractDataFromDate(customDate, rawData.getArray());
    if (searchIdx !== -1) {
      // -1 is returned for undefined values in javascript
      current = dataManager.getMarketTrend(idx);
      year = current.date.substring(0, 4);
    }
  }

  /*-------------------------------------------------------------
GENERATING ROADWAY PARTICLES AND DETAILS
-------------------------------------------------------------*/
  current = dataManager.getMarketTrend(idx);
  year = current.date.substring(0, 4);
  let marketWord = wordnik.marketWord;

  if (frameCount % 1.5 == 0) {
    let laneNum = floor(random(10));
    let chance = random(1);

    if (chance >= 0.05) {
      particles.push(new Prices(current, idx + laneNum));
    } else {
      particles.push(new Vols(current, idx + laneNum));
      particles.push(new Volumes(current, idx + laneNum));
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].move(0.075);
    particles[i].display();

    if (particles[i].z > 1.5) {
      particles.splice(i, 1);
    }
  }

  //drawing sentiment analysis
  printAnalysis();
  customDate = "";

  //loading images
  imageMode(CENTER);
  car.resize(500, 0);
  image(car, 0, 75);

  //loading slider text
  textAlign(CENTER);
  fill(255, 200);
  textSize(15);
  text(year, 0, 300);

  //loading legend
  legend();

  //display stats
  drawHUD("A");
  drawHUD("B");

  /*-------------------------------------------------------------
SEARCHING AND SORTING VISUALIZED
-------------------------------------------------------------*/

  // running the searching comparison
  if (searchButtonPressed) {
    compareSearch(listedData, current.date);
    searchButtonPressed = false;
  }

  // running the sorting comparison
  if (sortButtonPressed) {
    startSortRace();
    sortButtonPressed = false;
  }

  if (isSorting) {
    for (let i = 0; i < 50; i++) {
      updateSortStats(bubbleList, insertionList);

      if (!isSorting) {
        break;
      }
    }
  }

  if (searchStressTimer > 0) {
    searchStressTimer--;
  }

  if (searchStressTimer === 0 && !isSorting) {
    targetStressA = 0;
    targetStressB = 0;
  }

  //updating gauges to show algorithm efficiencies
  updateGauges();
  displaySpeedometer(-198, -210);
  displaySpeedometer(198, -210);
  drawNeedle("A", -198, -210);
  drawNeedle("B", 198, -210);

  //adding extra details based on market status
  textSize(14);
  color(255);
  text("Adjust Recursion lightning Intensity", 50, 575);
  let userIntensity = intensitySlider.value();
  let branchProb = map(userIntensity, 0, 10, 0, 0.8);
  let lightningDepth = map(userIntensity, 0, 10, 4, 12);
  let lightningColor = 255;

  if (lastMarketTrend === "BUY") {
    lightningColor = (0, 255, 100);
  } else if (lastMarketTrend === "SELL") {
    lightningColor = (255, 50, 50);
  }

  let strikeChance = 0.02 + userIntensity * 0.03;

  push();
  if (random(1) < strikeChance) {
    stroke(lightningColor);
    strokeWeight(random(1, 3));
  }
  drawLightning(
    -windowWidth / 2 + 350,
    -windowHeight / 2 + 50,
    90,
    100,
    lightningDepth,
    branchProb,
  );
  pop();

  if (["2002", "2004", "2008", "2009", "2020", "2024"].includes(year)) {
    fire.resize(300, 0);
    image(fire, 0, -50);
  }
}
