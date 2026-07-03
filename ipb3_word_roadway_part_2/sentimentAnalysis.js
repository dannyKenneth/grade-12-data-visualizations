/**
 * Creates a box that shows an analysis of the market on a given day, including a word describing the market, the general economic situation, and whetehr you should buy or sell
 * @return {void} Results are visual
 */
function printAnalysis() {
  push();
  //creating analysis box
  fill(0, 180);
  stroke(255, 30);
  rect(-650, -60, 300, 200, 5);

  //title
  textAlign(LEFT);
  textFont("monospace");
  textSize(14);
  fill(225);
  text("Market Stats:", -625, -40);

  //buy or sell decision
  textSize(22);
  if (lastMarketTrend == "BUY") {
    fill(0, 255, 150);
  } else {
    fill(255, 75, 75);
  }
  text("You should: " + lastMarketTrend, -625, -10);

  //long term market analysis
  textSize(12);
  textAlign(LEFT);
  fill(255);
  textWrap(WORD);
  if (["2002", "2004", "2008", "2009", "2020", "2024"].includes(year)) {
    text(
      "The market this year has been in recession. \nThis is likely due to major economic evnts \nor a decrease in interest for BMW products",
      -635,
      10,
    );
  } else if (["1997", "1999", "2012", "2021", "2023"].includes(year)) {
    text(
      "The market this year has been in an \neconomic boom. This is likely due to \nmajor economic evnts or an increase in \ninterest for BMW products",
      -635,
      10,
    );
  } else {
    text(
      "The market this year has shown no \nphysical incline or decline.",
      -635,
      10,
    );
  }
  //wordnik description
  let word = wordnik.marketWord;
  let pos = RiTa.pos(word)[0]; // retrieve first tag
  let beginning = "";
  textAlign(LEFT);
  textSize(12);
  fill(255);
  textWrap(WORD);

  // using RiTa pos to determine part of speech and sentence structure
  if (pos.includes("nn")) {
    beginning = "The market is currently seeing " + word;
  } else if (pos.includes("jj")) {
    beginning = "The market feels " + word + " today";
  } else if (pos.includes("vb")) {
    ingWord = RiTa.conjugate(word, {
      tense: "present",
      number: "singular",
      person: "third",
      form: "participle",
    });
    beginning = "The market is " + ingWord + " rapidly today";
  } else {
    beginning = "The market today can be described as " + word;
  }
  text(beginning + ", meaning " + wordnik.wordDesc, -635, 65, 280);
  pop();
}
