/**
 * Class that stores the async functions and api requests used in the program, as well as descripton logic
 */
class WordnikApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.lastWord = "";
    this.marketWord = "___";
    this.wordDesc = "___";
    this.words = [];
  }

  /**
   * Follows a two step api request to fetch related words to a market term, and fetch it's definition
   * @param {string} sentiment The special word used to describe the situation of the market and will be used to fetch similar words of
   * @return {object} final chosen random word and its definition in one sentence
   */
  getMarketAnalysis(sentiment) {
    let url =
      `https://api.wordnik.com/v4/word.json/${sentiment.toLowerCase()}/relatedWords?` +
      `useCanonical=true&` +
      `relationshipTypes=synonym&` +
      `limitPerRelationshipType=1000&` +
      `minCorpusCount=1000&` +
      `api_key=${this.apiKey}&` +
      `t=${Date.now()}`;

    // fetching related words to use in program
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0 && data[0].words) {
          this.words = data[0].words;
          let randomWord = this.words[floor(random(this.words.length))];

          let defUrl = `https://api.wordnik.com/v4/word.json/${randomWord}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=${this.apiKey}`;

          // fetching definition of chosen random word that will appear in the program
          return fetch(defUrl)
            .then((defResult) => defResult.json())
            .then((defData) => {
              if (defData && defData.length > 0) {
                return {
                  word: randomWord,
                  definition: defData[0]
                    ? defData[0].text
                    : "No definition found.",
                };
              }
            });
        }
      })

      // preparing to return final results to the rest of the program
      .then((finalResult) => {
        if (finalResult) {
          this.marketWord = finalResult.word;
          this.wordDesc = finalResult.definition;

          if (this.marketWord && this.wordDesc) {
            let sentences = RiTa.sentences(this.wordDesc);
            let sentence = sentences[0];
          }
        }
      });
  }
}
