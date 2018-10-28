/* eslint-disable no-undef */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Ingredients from '../components/Ingredients';
import Instructions from '../components/Instructions';
import { resetErrorMessage } from '../actions'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    ingredientsValue: PropTypes.string.isRequired,
    instructionsValue: PropTypes.string.isRequired,
    // Injected by React Router
    children: PropTypes.node
  }

  getInputValue = () => {
    return this.input.value
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange = nextValue => {
    this.props.history.push(`/${nextValue}`)
  }

  handleGoClick = () => {
    this.props.onChange(this.getInputValue())
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        <button onClick={this.handleDismissClick}>
          Dismiss
        </button>
      </p>
    )
  }

  render() {
    const { children, inputValue, ingredientsValue, instructionsValue } = this.props
    return (
      <div>
        <Ingredients value={ingredientsValue}
            onChange={this.handleChange} />
        <Instructions value={instructionsValue}
            onChange={this.handleChange} />
        <hr />
        <button onClick={this.handleGoClick}>
          Go!
        </button>
        <hr />
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default withRouter(connect(mapStateToProps, {
  resetErrorMessage
})(App))
