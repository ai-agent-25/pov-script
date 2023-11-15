export const removeKeywords = (inputString: string, keywords: string[]) => {
  let indexOfFirstKeyword = Number.MAX_SAFE_INTEGER;

  for (const keyword of keywords) {
    const index = inputString.indexOf(keyword);
    if (index !== -1 && index < indexOfFirstKeyword) {
      indexOfFirstKeyword = index;
    }
  }

  if (indexOfFirstKeyword !== Number.MAX_SAFE_INTEGER) {
    return inputString.substring(0, indexOfFirstKeyword).trim();
  } else {
    return inputString.trim();
  }
};
