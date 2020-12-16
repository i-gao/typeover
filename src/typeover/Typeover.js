/* eslint-disable default-case */
import React, { Component } from "react";
import * as util from "./utils"
import './styles.css'

export default class Typeover extends Component {
  /**
   * @param {string} text
   * @param {boolean} holdOnError force user to retype if mistake
   * @param {boolean} hint if false, does not show base text
   * @param {function} onError callback function for an error
   * @param {function} onComplete callback function for complete
   */
  constructor({ text, holdOnError, hint, onError, onComplete }) {
    super();

    // process args
    if (!text || typeof(text) != 'string') {
      throw RangeError("Text must be provided as a string");
    }
    this.text = text.trim();
    this.holdOnError = (holdOnError !== undefined) ? holdOnError : false;
    this.hint = (hint !== undefined) ? hint : true;
    this.onError = (onError) ? onError : () => {};
    this.onComplete = (onComplete) ? onComplete : () => {};

    this.leadSpaces = text.slice(0, util.countLeadSpaces(text));
    this.state = {
      input: "", // user input so far
      error: false // flag for whether user has made an error
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

    switch (util.type(e.keyCode)) {
      case "BACK":
        // remove either end printable char or all consecutive whitespace chars
        let numSpaces = util.countTailSpaces(currInput);
        await this.setState({
          input: currInput.slice(0, numSpaces > 0 ? -numSpaces : -1)
        });
        // after removed: if on hold, check if we can now lift hold
        if (this.state.error) this.validate();
        break;
      case "SPACE":
        if (!this.holdOnError || !this.state.error) this.setState({ input: currInput + key });
        this.validate(true);
        break;
      case "PRINTABLE":
        if (!this.holdOnError || !this.state.error) this.setState({ input: currInput + key });
        break;
    }
  }

  /**
   * called on space, checks if word is correct
   * autocorrects for: missing punctuation, wrong case, and adds on appropriate newline/space
   * @param {bool} autocorrect, whether to also autocorrect input to text
   * @output {bool, string} sets state of error and autocorects input
   */
  async validate(autocorrect = false) {
    let textslice = autocorrect
      ? util.roundedString(this.state.input.length - 1, this.text)
      : this.text.slice(0, this.state.input.length);

    let clear = util.fuzzyMatch(this.state.input, textslice);
    if (!clear) this.onError();
    if (this.holdOnError) await this.setState({ error: !clear });

    if (autocorrect && (!this.holdOnError || clear)) {
      this.setState({ input: textslice });
    }
  }

  componentWillUpdate() {
    this.complete =
      !this.state.error && this.state.input.length >= this.text.length;
    if (this.complete) this.onComplete();
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
        <span 
          id="typeover-input"
          className={this.state.error ? "typeover-error" : "typeover-show"}
        >
          {this.leadSpaces}
          {this.state.input}
        </span>
        <span
          id="typeover-reference"
          className={this.hint ? "typeover-hint" : "typeover-hide"}
        >
          {this.text.slice(this.state.input.length)}
        </span>
      </div>
    );
  }
}