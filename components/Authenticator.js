import React from 'react'

import states from './states'

export default class Authenticator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {auth: props.authState || states.loading}

    this.handleStateChange = this.handleStateChange.bind(this)
  }

  componentDidMount () {
    const {auth: state, authData: data} = this.state
    if (this.props.onStateChange) { this.props.onStateChange(state, data, this.handleStateChange) }
  }

  render () {
    const {auth, authData} = this.state

    return React.Children.map(this.props.children || [], (child, index) => {
      return React.cloneElement(child, {
        key: 'authenticator-props-children-' + index,
        authState: auth,
        authData: authData,
        onStateChange: this.handleStateChange,
      })
    })
  }

  handleStateChange (state, data) {
    if (state === this.state.auth) { return }

    if (state === states.signedOut) { state = states.signIn }
    this.setState({auth: state, authData: data})
    if (this.props.onStateChange) { this.props.onStateChange(state, data, this.handleStateChange) }
  }
}