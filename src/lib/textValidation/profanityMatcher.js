import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from "obscenity";

// obscenity's English preset covers profanity, sexual content, and hate
// slurs in one curated, actively-maintained dataset, with transformers that
// resist common evasion tricks (leetspeak, repeated/duplicated letters,
// separators, lookalike characters) - so "f.u.c.k" / "fuuuck" / "fu*k" are
// still caught, not just exact word matches.
let matcher = null;

function getMatcher() {
  if (!matcher) {
    matcher = new RegExpMatcher({
      ...englishDataset.build(),
      ...englishRecommendedTransformers,
    });
  }
  return matcher;
}

export function containsProfanity(text) {
  if (!text) return false;
  return getMatcher().hasMatch(text);
}
