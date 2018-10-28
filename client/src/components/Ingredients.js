/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Ingredients extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value)
    }
  }

  setInputValue = (val) => {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.input.value = val
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
  }

  render() {
    return (
      <div>
        <p>List your ingredients (separate by comma or space):</p>
        <textarea
               ref={(input) => this.input = input}
               defaultValue={this.props.value}
               onKeyUp={this.handleKeyUp} />
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    )
  }
}
