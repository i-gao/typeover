/* eslint-disable default-case */
import React, { Component } from "react";

export default class Typeover extends Component {
  /**
   * @param {string} text
   * @param {bool} hint if false, does not show base text
   * @param {function} onError, callback function for an error
   * @param {function} onComplete, callback function for complete
   */
  constructor(props) {
    super(props);
    this.text = props.text.trim();
    this.leadSpaces = props.text.slice(0, countLeadSpaces(props.text));
    this.state = {
      input: "", // user input so far
      clear: true // is user clear to type (no holds)
    };
    this.handleKey = this.handleKey.bind(this);
  }

  /**
   * handles key presses and user input controller
   * @param {event obj} e
   * @output {string} sets state of input
   */
  async handleKey(e) {
    const currInput = this.state.input;
    var key = e.key; // bc events expire after other async calls
    e.preventDefault(); // to prevent scrolling

    switch (type(e.keyCode)) {
      case "BACK":
        // remove either end printable char or all consecutive whitespace chars
        let numSpaces = countTailSpaces(currInput);
        await this.setState({
          input: currInput.slice(0, numSpaces > 0 ? -numSpaces : -1)
        });
        // after removed: if on hold, check if we can now lift hold
        if (!this.state.clear) this.validate();
        break;
      case "SPACE":
        if(this.state.clear) this.setState({ input: currInput + key });
        this.validate(true);
        break;
      case "PRINTABLE":
        if (this.state.clear) this.setState({ input: currInput + key });
        break;
    }
  }

  /**
   * called on space, checks if word is correct
   * autocorrects for: missing punctuation, wrong case, and adds on appropriate newline/space
   * @param {bool} autocorrect, whether to also autocorrect input to textslice on clear
   * expects input to have space at end
   * @output {bool, string} sets state of clear and autocorects input
   */
  async validate(autocorrect = false) {
    let textslice = autocorrect
      ? roundedString(this.state.input.length - 1, this.text)
      : this.text.slice(0, this.state.input.length);

    let clear = fuzzyMatch(this.state.input, textslice);
    if (!clear) this.props.onError();
    await this.setState({ clear: clear });

    if (clear && autocorrect) this.setState({ input: textslice });
    //if (!clear && autocorrect) this.setState({ input: oldInput.slice(0, -1) });
  }

  componentWillUpdate() {
    this.complete =
      this.state.clear && this.state.input.length >= this.text.length;
    if (this.complete) this.props.onComplete();
  }

  render() {
    // check whether we're done so that we can disable edits on complete
    return (
      <div
        id="typeover-wrapper"
        tabIndex="0"
        className={this.complete ? "typeover-complete" : null}
        onKeyDown={this.complete ? null : this.handleKey}
      >
        <span id="typeover-input" className={this.state.clear ? "typeover-show" : "typeover-error"}>
          {this.leadSpaces}
          {this.state.input}
        </span>
        <span
          id="typeover-reference"
          className={this.props.hint ? "typeover-hint" : "typeover-hide"}
        >
          {this.text.slice(this.state.input.length)}
        </span>
      </div>
    );
  }
}

/** UTILS **/

/**
 * filters keycodes that can be displayed in an input box
 * @param {int} code, a keycode expected [0, 242]
 * @returns {string}, either "SPACE" "BACK" "PRINTABLE". if not a valid char, returns nothing
 * */
const type = code => {
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
const roundedString = (initial, text) => {
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
const countLeadSpaces = text => {
  return text.search(/\S./);
};

/**
 * @param {string} text
 * @returns {int} number of spaces (or newlines) at end of string. 0, n, -1
 */
const countTailSpaces = text => {
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
const fuzzyMatch = (word, reference) => {
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
const anagrams = (a, b) => 
  a
    .split("")
    .sort()
    .join("") ===
  b
    .split("")
    .sort()
    .join("");
