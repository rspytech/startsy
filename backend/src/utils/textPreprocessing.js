import natural from "natural";
import stopword from "stopword";
import lemmatizer from "wink-lemmatizer";

// Tokenizer
const tokenizer = new natural.WordTokenizer();

export function preprocessText(text) {
  if (!text) return "";

  // 1. Lowercase
  let lowercased = text.toLowerCase();

  // 2. Remove emojis using regex
  let noEmojis = lowercased.replace(
    /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])+/g,
    ""
  );

  // 3. Remove punctuation
  let noPunct = noEmojis.replace(/[^\w\s]/g, "");

  // 4. Remove numbers
  let noNumbers = noPunct.replace(/\d+/g, "");

  // 5. Tokenize using natural's tokenizer
  let tokens = tokenizer.tokenize(noNumbers);

  // 6. Remove stopwords
  let filteredTokens = stopword.removeStopwords(tokens);

  // 7. Lemmatize (attempt as noun first, fallback to verb if needed)
  let lemmatized = filteredTokens.map(token => {
    let nounLemma = lemmatizer.noun(token);
    if (nounLemma !== token) return nounLemma;

    let verbLemma = lemmatizer.verb(token);
    return verbLemma !== token ? verbLemma : token;
  });

  // 8. Remove empty tokens and join
  let cleaned = lemmatized.filter(Boolean).join(" ");

  return cleaned;
}
