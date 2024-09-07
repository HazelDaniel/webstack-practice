/**
 * opts :
*/
export const dynamicReplace = (inputString, opts) => {
  const optsKeyQueue = Object.keys(opts);
  const optsValueQueue = Object.values(opts);
  let resString = inputString;

  while (optsKeyQueue.length && optsValueQueue.length) {
    [currKey, currVal] = [optsKeyQueue.pop(), optsValueQueue.pop()]
    resString = resString.replace(currKey, currVal);
  }
  return resString;
}

const wildCompare = (string1, string2, start1, start2, len1, len2) => {
  if (start1 === len1) {
    if (string2[start2] === "*") {
      return wildCompare(string1, string2, start1, start2 + 1, len1, len2);
    }
    return start2 === len2;
  }

  if (string2[start2] === "*") {
    return wildCompare(string1, string2, start1 + 1, start2, len1, len2) || wildCompare(string1, string2, start1, start2 + 1, len1, len2)
  }
  if (string1[start1] === string2[start2]) {
    return wildCompare(string1, string2, start1 + 1, start2 + 1, len1, len2);
  }
  return false;
}

const matchGlob = (string1, string2) => {
  const len1 = string1.length;
  const len2 = string2.length;
  return wildCompare(string1, string2, 0, 0, len1, len2);
}

export const dynamicMatch = (inputString, pattern, delimiter, segmentIndicator = undefined) => {
  let segmentMode = !!segmentIndicator;
  if (segmentIndicator === "*") {
    throw new Error("you cannot use a global match as a segment indicator");
  }
  if (inputString.endsWith(delimiter)) inputString = inputString.slice(0, -1);
  if (pattern.endsWith(delimiter)) pattern = pattern.slice(0, -1);
  const patternChunk = pattern.split(delimiter);
  const inputChunk = inputString.split(delimiter);


  if (pattern.indexOf("*") !== -1) {
    return matchGlob(inputString, pattern);
  }

  if (inputChunk.length !== patternChunk.length) {
    return false;
  }

  let matchCount = 0;

  for (let i = 0; i < inputChunk.length; i++) {
    if (inputChunk[i] === patternChunk[i]) {
      matchCount++;
    } else if (segmentMode && patternChunk[i].startsWith(segmentIndicator) && (!inputChunk[i].startsWith(segmentIndicator))) {
      matchCount++;
    } else {
      break;
    }
  }
  return matchCount === inputChunk.length;
}
