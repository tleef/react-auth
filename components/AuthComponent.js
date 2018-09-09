import React from 'react'

import AuthService from '../../services/AuthService'

export default class AuthComponent extends React.Component {
  constructor (validAuthStates, props) {
    super(props)

    this.validAuthStates = validAuthStates
    this.authService = new AuthService()

    this.changeState = this.changeState.bind(this)
    this.error = this.error.bind(this)
  }

  render () {
    if (!this.validAuthStates.includes(this.props.authState)) {
      return null
    }

    return this.showComponent()
  }

  showComponent () {
    throw new Error('Not Implemented')
  }

  changeState (state, data) {
    if (this.props.onStateChange) {
      this.props.onStateChange(state, data)
    }
  }

  error (err) {
    let msg = ''
    if (typeof err === 'string') {
      msg = err
    } else if (err.message) {
      msg = err.message
    } else {
      msg = JSON.stringify(err)
    }

    this.setState({ error: msg })
  }
}
