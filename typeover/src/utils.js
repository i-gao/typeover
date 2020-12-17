/**
 * filters keycodes that can be displayed in an input box
 * @param {int} code, a keycode expected [0, 242]
 * @returns {string}, either "SPACE" "BACK" "PRINTABLE". if not a valid char, returns nothing
 * */
export const type = code => {
    if (code === 32) return "SPACE";
    if (code === 8) return "BACK";
    if (
        (code > 64 && code < 91) /*alpha*/ ||
        ((code > 185 && code < 192) || code === 222) /*punc*/
    )
        return "PRINTABLE";
};

/**
 * rounds to the next set of spaces or newlines from a starting length
 * @param {int} initial the index from which to start rounding
 * @param {string} text
 * @returns {string} the start of text rounded up to the  set of whitespace
 */
export const roundedString = (initial, text) => {
    if (initial === -1) return ""; 
    let firstSpace = text.slice(initial).search(/\n|\s/);
    let index = initial + firstSpace;
    return firstSpace === -1
        ? text
        : text.slice(0, index + countLeadSpaces(text.slice(index)));
};

/**
 * @param {string} text
 * @returns {int} number of spaces (or newlines) at start of string. 0, n, -1
 */
export const countLeadSpaces = text => {
    return text.search(/\S./);
};

/**
 * @param {string} text
 * @returns {int} number of spaces (or newlines) at end of string. 0, n, -1
 */
export const countTailSpaces = text => {
    let reverse = text
        .split("")
        .reverse()
        .join("");
    return countLeadSpaces(reverse);
};

/**
 * @param {string} word, reference to fuzzymatch
 * @returns {bool} if words roughly match, stripped of punctuation, whitespace, and case
 * the same as ref
 */
export const fuzzyMatch = (word, reference) => {
    const fuzzyWord = word
        .replace(/[^\w\s]|_/g, "")
        .trim()
        .toUpperCase();
    const fuzzyRef = reference
        .replace(/[^\w\s]|_/g, "")
        .trim()
        .toUpperCase();
    return anagrams(fuzzyWord, fuzzyRef);
};

/**
 * @param {string} a
 * @param {string} b
 * @returns {bool} if words are anagrams of each other (same letters)
 */
export const anagrams = (a, b) =>
    a.split("").sort().join("") === b.split("").sort().join("");
