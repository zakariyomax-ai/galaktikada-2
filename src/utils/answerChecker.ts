export function normalizeUzbekWord(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    // normalize all apostrophe types to a standard single quote
    .replace(/[ʻʼ’‘`´]/g, "'")
    // remove non-alphanumeric except standard apostrophe and hyphens
    .replace(/[^a-z0-9' -]/g, '')
    .trim();
}

export function checkSingleWordAnswer(
  userText: string,
  canonicalAnswer: string,
  acceptableAnswers: string[]
): boolean {
  const normalizedUser = normalizeUzbekWord(userText);
  if (!normalizedUser) return false;

  const normalizedCanonical = normalizeUzbekWord(canonicalAnswer);
  if (normalizedUser === normalizedCanonical) return true;

  // Check acceptable variations
  for (const alt of acceptableAnswers) {
    if (normalizedUser === normalizeUzbekWord(alt)) {
      return true;
    }
  }

  // Also check without apostrophes completely
  const stripApostrophes = (s: string) => s.replace(/'/g, '');
  if (stripApostrophes(normalizedUser) === stripApostrophes(normalizedCanonical)) {
    return true;
  }

  for (const alt of acceptableAnswers) {
    if (stripApostrophes(normalizedUser) === stripApostrophes(normalizeUzbekWord(alt))) {
      return true;
    }
  }

  return false;
}
