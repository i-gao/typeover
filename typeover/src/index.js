/* eslint-disable default-case */
import React, { Component } from "react";
import * as util from "./utils";
import "./style.css";

const INITIAL_STATE = {
  input: "", // user input so far
  error: false, // flag for whether user has made an error
  complete: false, // when complete, disable further typing
};

class Typeover extends Component {
  /**
   * @param {string} text
   * @param {boolean} holdOnError force user to retype if mistake
   * @param {boolean} hint if false, does not show base text
   * @param {function} onError callback function for an error
   * @param {function} onComplete callback function for complete
   * @param {string} id ids
   * @param {string} className classes
   * @param {object} styles styles for the #typeover-wrapper div
   */
  constructor(props) {
    super(props);
    this.processProps = this.processProps.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.validate = this.validate.bind(this);
    this.checkComplete = this.checkComplete.bind(this);

    this.processProps(props);
    this.state = INITIAL_STATE;
  }

  /**
   * process defaults and class variables from props
   * @param {*} props 
   */
  processProps(props) {
    if (!props.text || typeof (props.text) != 'string') {
      throw RangeError("Text must be provided as a string");
    }
    this.text = props.text.trim();
    this.holdOnError = (props.holdOnError !== undefined) ? props.holdOnError : false;
    this.hint = (props.hint !== undefined) ? props.hint : true;
    this.onError = (props.onError) ? props.onError : () => { };
    this.onComplete = (props.onComplete) ? props.onComplete : () => { };
    this.id = (props.id) ? props.id : "typeover-wrapper";
    this.className = (props.className) ? props.className + " " : "";
    this.styles = (props.styles !== undefined) ? props.styles : {};
    this.leadSpaces = this.text.slice(0, util.countLeadSpaces(this.text));
  }

  /** if props have changed, reset component as if remounting */
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.processProps(this.props);
      this.setState(INITIAL_STATE);
      return;
    }
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
    this.checkComplete();
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

  /**
   * for all characters, check if we have finished typing the text
   * if complete, change state, which freezes the textbox
   * if complete, call onComplete callback
   */
  checkComplete() {
    if (!this.state.error
      && this.state.input.length >= this.text.length
      && this.text.length > 0) {
      this.setState({ complete: true })
      this.onComplete();
    }
  }

  render() {
    const { complete } = this.state;
    return (
      <div
        id={this.id}
        tabIndex="0"
        className={this.className + (complete ? "typeover-complete" : "")}
        onKeyDown={complete ? null : this.handleKey}
        style={this.styles}
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

export default Typeover;